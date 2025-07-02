<template>
    <q-page padding>
        <q-form class="row justify-center" @submit.prevent="handleForgotPassword">
            <p class="col-12 text-h5 text-center">Reset Password</p>
            <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
                <q-input
                    label="Email"
                    v-model="email"
                    outlined
                    lazy-rules
                    :rules="[ val => (val && val.length > 0) || 'Email is required']"
                    type="email"
                />

                <q-btn
                    label="Send Reset Email"
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
import useNotify from 'src/composables/UseNotify';

import { ref } from 'vue'
defineOptions({
  name: 'PageForgotPassword'
})

const { notifyError, notifySuccess } = useNotify()

const { sendPasswordRestEmail } = useAuthUser()

const email = ref('')

const handleForgotPassword = async () => {
    try {
        await sendPasswordRestEmail(email.value)
        notifySuccess(`Password reset email sent to: ${email.value}`)
    } catch (error) {
        notifyError(error.message)
    }
}
</script>