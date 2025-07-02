<template>
  <q-page class="flex flex-center">
    <div v-if="user">
      <p>Hello {{ user.user_metadata.name }}</p>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import useAuthUser from 'src/composables/UseAuthUser';

defineOptions({
  name: 'PageMe'
})

const { user } = useAuthUser()
console.log(user)
</script>
