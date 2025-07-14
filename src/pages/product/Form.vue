<template>
  <q-page padding>
    <div class="row justify-center">
    <div class="col-12 text-center">
      <p class="text-h6">
        Form Product
      </p>
    </div>
    <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" @submit.prevent="handleSubmit">

    <q-input
      label="Image"
      stack-label
      v-model="img"
      type="file"
      accept="image/*"
    />

    <q-input
      label="Name"
      v-model="form.name"
      :rules="[ val => (val && val.length > 0) || 'Name is required']"
    />

    <q-editor v-model="form.description" min-height="5rem" />

    <q-input
      label="Amount"
      v-model="form.amount"
      :rules="[ val => !!val || 'Amount is required']"
    />
   '<q-input
      label="Price"
      v-model="form.price"
      :rules="[ val => !!val || 'Price is required']"
      prefix="$"
    />'

    <q-select
      v-model="form.category_id"
      :options="optionsCategory"
      label="Category"
      option-value="id"
      option-label="name"
      map-options
      emit-value
      :rules="[ val => !!val || 'Category is required']"
    />
    <q-btn
      :label="isUpdated ? 'Update' : 'Save'"
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
      :to="{ name: 'product' }"
    />
    </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import useApi from 'src/composables/UseApi';
import useNotify from 'src/composables/UseNotify';
import useAuthUser from 'src/composables/UseAuthUser';


defineOptions({
  name: 'PageFormCategory'
})

const table = 'product'
const router = useRouter()
const route = useRoute()
const { post, getById, update, listPublic, uploadImg } = useApi()
const { notifyError, notifySuccess } = useNotify()
const { user } = useAuthUser()
const isUpdated = computed(() => route.params.id)

let product = {}
const optionsCategory = ref<any[]>([])

const form = ref({
  id: null,
  name: '',
  description: '',
  amount: 0,
  price: 0,
  category_id: '',
  img_url: ''
})
const img = ref([])

onMounted(() => {
  handleListCategory()
  if (isUpdated.value) {
    handleGetProduct(isUpdated.value)
  }
})

const handleListCategory = async () => {
  optionsCategory.value = await listPublic('category', user.value.id)
}

const handleSubmit = async () => {
  try {
    if (img.value.length > 0) {
      const imgUrl = await uploadImg(img.value[0], 'products')
      form.value.img_url = imgUrl
    }
    if (isUpdated.value) {
       console.log('Updating category with ID:', form.value.id)
      await update(table, form.value)
      notifySuccess("Success.")
    } else {
      await post(table, form.value)
      notifySuccess("Success.")
    }
    router.push({ name: 'product' })
  } catch (error) {
    notifyError(error.message)
  }
}

const handleGetProduct = async (id) => {
  try {
    product = await getById(table, id)
    form.value = {
      id: product.id,
      name: product.name
    }
  } catch (error) {
    notifyError(error.message)
  }
}
</script>