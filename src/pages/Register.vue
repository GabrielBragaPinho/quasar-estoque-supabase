<template>
  <q-page padding>
  <q-form class="row justify-center" @submit.prevent="handleRegister">
    <p class="col-12 text-h5 text-center">Register</p>
    <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
      <q-input
        label="Name"
        v-model="form.name"
        outlined
        lazy-rules
        :rules="[ val => (val && val.length > 0) || 'Name is required']"
      />

      <q-input
        label="Email"
        v-model="form.email"
        outlined
        lazy-rules
        :rules="[ val => (val && val.length > 0) || 'Email is required']"
        type="email"
      />

      <q-input
        label="Password"
        v-model="form.password"
        outlined
        lazy-rules
        :rules="[ val => (val && val.length >= 6) || 'Password is required and at least 6 chars.']"
      />

      <q-btn
        label="Register"
        color="primary"
        class="full-width"
        outline
        type="submit"
      />
      <q-btn
        label="back"
        color="primary"
        class="full-width"
        flat
        :to="{ name:'login' }"
      />
    </div>
  </q-form>
  </q-page>
</template>

<script setup lang="ts">
import useAuthUser from 'src/composables/UseAuthUser';
import { useRouter } from 'vue-router';
import useNotify from 'src/composables/UseNotify';
import { ref } from 'vue'
defineOptions({
  name: 'PageRegister'
})

const { notifyError, notifySuccess } = useNotify()

const router = useRouter()
const  { register } = useAuthUser()

const form = ref({
  name: '',
  email: '',
  password: ''
})

const handleRegister = async () => {
  try {
    await register(form.value)
    notifySuccess('Success.')
    router.push({
      name: 'email-confirmation',
      query: { email: form.value.email }
    })
  } catch (error) {
    notifyError(error)
  }
}
</script>
