import useSupabase from "src/boot/supabase";
import useAuthUser from "./UseAuthUser";
import { v4 as uuidv4 } from "uuid";
import { useRoute } from "vue-router";
import useBrand from "./UseBrand";
import { useQuasar } from "quasar";
import { ref } from "vue";

const brand = ref({
    primary: '',
    secondary:'',
    name:'',
    phone:'',
    paralax_url:''
})

export default function useApi () {
    const { supabase } = useSupabase()
    const { user } = useAuthUser()
    const route = useRoute()
    const { setBrand } = useBrand()
    const $q = useQuasar()

    const list = async (table) => {
        const { data, error } = await supabase
            .from(table)
            .select('*')
            if (error) throw error
            return data
    }
    const listPublic = async (table, userId, columnFilter = '', filter= '') => {
        const { data, error } = await supabase
            .from(table)
            .select('*')
            .eq('user_id', userId)
            .eq(columnFilter, filter)
            if (error) throw error
            return data
    }
    const getById = async (table, id) => {
        const { data, error } = await supabase
            .from(table)
            .select('*')
            .eq('id', id)
        if (error) throw error
        return data[0]
    }
    const post = async (table, form) => {
        const { id, ...rest } = form
        const { data, error } = await supabase
            .from(table)
            .insert([{
                ...rest,
                user_id: user.value.id
            }])
           if (error) throw error
            return data
    }
    const update = async (table, form) => {
        const { data, error } = await supabase
            .from(table)
            .update({
                ...form
        })
            .match({ id: form.id })
        if (error) throw error
        return data
    }
    const remove = async (table, id) => {
        const { data, error } = await supabase
            .from(table)
            .delete()
            .match({ id })
        if (error) throw error
        return data
    }

    const uploadImg = async (file, storage) => {
        const fileName = uuidv4()
        const { error, data } = await supabase
        .storage
        .from(storage)
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
        })
        if (error) throw error
        const publicUrl = await getUrlPublic(fileName, storage)
        return publicUrl
    }

    const getUrlPublic = async (fileName, storage) => {
        const { data } = supabase
        .storage
        .from(storage)
        .getPublicUrl(fileName)
        return data.publicUrl
    }

    const getBrand = async () => {
        const id = route.params.id || user.value?.id
        if (id) {
            $q.loading.show({
                 backgroundColor: 'grey-10'
            })
            const { data, error } = await supabase
                .from('config')
                .select('*')
                .eq('user_id', id)
                if (error) throw console.error
                if (data.length > 0) {
                    brand.value = data[0]
                    setBrand(brand.value.primary, brand.value.secondary)
                };
                $q.loading.hide()
                return brand
        }
    }
    return {
        list,
        listPublic,
        getById,
        post,
        update,
        remove,
        uploadImg,
        getUrlPublic,
        getBrand,
        brand
    }
}