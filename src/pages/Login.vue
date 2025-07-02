<template>
  <q-page padding>
  <q-form class="row justify-center" @submit.prevent="handleLogin">
    <p class="col-12 text-h5 text-center">Login</p>
    <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
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
        :rules="[ val => (val && val.length > 0) || 'Password is required']"
      />

      <q-btn
        label="Login"
        color="primary"
        class="full-width"
        outline
        type="submit"
      />
      <q-btn
        label="Register"
        color="primary"
        class="full-width"
        flat
        to="/register"

      />
      <q-btn
        label="Forgot Password?"
        color="primary"
        class="full-width q-my-sm"
        flat
        :to="{name: 'forgot-password'}"
      />
    </div>
  </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'

const router = useRouter()
const { login, isLoggedIn } = useAuthUser()
const { notifyError, notifySuccess } = useNotify()

defineOptions({
  name: 'PageLogin'
})

const form = ref({
  email: '',
  password: ''
})

onMounted(() => {
  if (isLoggedIn) {
    router.push({ name: 'me' })
  }
})

const handleLogin = async () => {
  try {
    await login(form.value)
    notifySuccess('Login successful.')
    router.push({ name: 'me' })
  } catch (error) {
    notifyError(error.message)
  }
}
</script>
