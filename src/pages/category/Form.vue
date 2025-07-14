<template>
  <q-page padding>
    <div class="row justify-center">
    <div class="col-12 text-center">
      <p class="text-h6">
        Form category
      </p>
    </div>
    <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md" @submit.prevent="handleSubmit">
    <q-input
      label="Name"
      v-model="form.name"
      :rules="[ val => (val && val.length > 0) || 'Name is required']"
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
      :to="{ name: 'category' }"
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
import { matCategory } from '@quasar/extras/material-icons';

defineOptions({
  name: 'PageFormCategory'
})

const table = 'category'
const router = useRouter()
const route = useRoute()
const { post, getById, update } = useApi()
const { notifyError, notifySuccess } = useNotify()

const isUpdated = computed(() => route.params.id)

let category = {}

const form = ref({
  id: null,
  name: ''
})

onMounted(() => {
  if (isUpdated.value) {
    handleGetCategory(isUpdated.value)
  }
})

const handleSubmit = async () => {
  try {
    if (isUpdated.value) {
       console.log('Updating category with ID:', form.value.id)
      await update(table, form.value)
      notifySuccess("Success.")
    } else {
      await post(table, form.value)
      notifySuccess("Success.")
    }
    router.push({ name: 'category' })
  } catch (error) {
    notifyError(error.message)
  }
}

const handleGetCategory = async (id) => {
  try {
    category = await getById(table, id)
  console.log('Fetched category:', category)
    form.value = {
      id: category.id,
      name: category.name
    }
  } catch (error) {
    notifyError(error.message)
  }
}
</script>