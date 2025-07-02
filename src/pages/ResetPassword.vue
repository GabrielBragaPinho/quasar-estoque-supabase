<template>
    <q-page padding>
        <q-form class="row justify-center" @submit.prevent="handlePasswordReset">
            <p class="col-12 text-h5 text-center">Reset Password</p>
            <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
                <q-input
                    label="New Password"
                    v-model="password"
                    outlined
                    lazy-rules
                    :rules="[ val => (val && val.length >= 6) || 'Password is required']"
                />

                <q-btn
                    label="Send Reset Email"
                    color="primary"
                    class="full-width"
                    outline
                    type="submit"
                />
            </div>
        </q-form>
    </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import useAuthUser from 'src/composables/UseAuthUser';
import useNotify from 'src/composables/UseNotify';
import { tokenToString } from 'typescript';
defineOptions({
  name: 'PageResetPassword'
})

const { notifyError, notifySuccess } = useNotify()

const { resetPassword } = useAuthUser()
const route = useRoute()
const router = useRouter()
const token = route.query.token

const password = ref('')

const handlePasswordReset = async () => {
    try {
        await resetPassword(token, password.value)
        notifySuccess('New password sent.')
        router.push({ name: 'login' })
    } catch (error) {
        notifyError(error.message)
    }

}
</script>