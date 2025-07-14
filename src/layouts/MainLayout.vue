
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
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Estoque
        </q-toolbar-title>

        <q-btn-dropdown flat color="white" icon="person">
          <q-item clickable v-close-popup>
            <q-item-section @click="handleLogout">
              <q-item-label>Logout</q-item-label>
            </q-item-section>
          </q-item>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Menu
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
    <transition
      appear
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutRight"
    >
      <router-view />
    </transition>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import useApi from 'src/composables/UseApi';
import useAuthUser from 'src/composables/UseAuthUser';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';

defineOptions({
  name: 'MainLayout'
})

onMounted(() => {
  getBrand()
})

const linksList: EssentialLinkProps[] = [
  {
    title: 'Home',
    icon: 'mdi-home',
    routeName: 'me'
  },
   {
    title: 'Category',
    icon: 'mdi-shape-outline',
    routeName: 'category'
  },
   {
    title: 'Product',
    icon: 'mdi-archive',
    routeName: 'product'
  },
  {
    title: 'Config',
    icon: 'mdi-cog',
    routeName: 'form-config'
  },
];

const leftDrawerOpen = ref(false);
const router = useRouter()
const { logout } = useAuthUser()
const $q = useQuasar()
const { getBrand } = useApi()


function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const handleLogout = async () => {
  $q.dialog({
    title: 'Logout',
    message: 'Do you really want to leave?',
    cancel: true,
    persistent: true
  }).onOk(async () =>{
    await logout()
    router.replace({ name: 'login' })
  })

}
</script>
