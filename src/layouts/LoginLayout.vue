<template>
  <q-layout view="lHh Lpr lFf">
      <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          Quasar Estoque
        </q-toolbar-title>

      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view /> <!-- ✅ This is required to display child pages like Login.vue -->
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useApi from 'src/composables/UseApi';

const { getBrand } = useApi()

defineOptions({
  name: 'LoginLayout'
})

onMounted(() => {
  getBrand()
})
</script>
