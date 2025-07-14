<template>
  <q-page padding>
    <div class="row justify-center">
    <div class="col-12 text-center">
      <p class="text-h6">
        Form Config
      </p>
    </div>
    <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" @submit.prevent="handleSubmit">
    <q-input
      label="Store Name"
      v-model="form.name"
      :rules="[ val => (val && val.length > 0) || 'Name is required']"
    />
      <q-input
      label="Phone"
      v-model="form.phone"
      mask="(##) #####-####"
      unmasked-value
    />
       <q-input
      label="Image Paralax"
      stack-label
      v-model="paralax"
      type="file"
      accept="image/*"
    />
    <div class="row justify-center q-gutter-md qpa-md">
        <q-color v-model="form.primary" class="col-md-4 col-sm-12 col-xs-12"/>
        <q-color v-model="form.secondary" class="col-md-4 col-sm-12 col-xs-12"/>
    </div>
    <q-btn
      label="Save"
      color="primary"
      class="full-width"
      rounded
      type="submit"
    />
     <q-btn
      label="Cancel"
      color="primary"
      class="full-width"
      rounded
      flat
      :to="{ name: 'category' }"
    />
    </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import useApi from 'src/composables/UseApi';
import useNotify from 'src/composables/UseNotify';
import useBrand from 'src/composables/UseBrand';
import useAuthUser from 'src/composables/UseAuthUser';

defineOptions({
  name: 'PageFormConfig'
})

const table = 'config'
const router = useRouter()
const { listPublic, update, uploadImg } = useApi()
const { notifyError, notifySuccess } = useNotify()
const { setBrand } = useBrand()
const { user } = useAuthUser()
const paralax = ref([])

const form = ref({
  id: null,
  name: '',
  phone:'',
  primary: '',
  secondary:'',
  paralax_url:''
})

onMounted(() => {
  handleGetConfig()
})

const handleSubmit = async () => {
  try {
    if (paralax.value.length > 0) {
      const paralaxUrl = await uploadImg(paralax.value[0], 'paralax')
      form.value.paralax_url = paralaxUrl
    }
    if (form.value.id) {
      await update(table, form.value)
      notifySuccess("Success.")
    }
    setBrand(form.value.primary, form.value.secondary)
    router.push({ name: 'me' })
  } catch (error) {
    notifyError(error.message)
  }
}

const handleGetConfig = async () => {
  try {
    const result = await listPublic(table, user.value.id)
    if (Array.isArray(result) && result.length > 0) {
      Object.assign(form.value, result[0])
    } else {
      console.warn('Nenhuma configuração encontrada.')
    }
  } catch (error) {
    notifyError(error.message)
  }
}
</script>