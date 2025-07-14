<template>
  <q-dialog
  :full-width="$q.platform.is.mobile"
    :model-value="show"
    @before-hide="handleClose"
  >
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Detalhes
        </div>
      </q-card-section>

      <q-card-section v-if="product.img_url">
        <q-img :src="product.img_url" :ratio="4/3" style="min-width: 300px"/>
      </q-card-section>

      <q-card-section>
        <div class="text-h6">
          {{ product.name }}
        </div>
        <div class="text-subtitle2">
          {{ formatCurrency(product.price) }}
        </div>
        <div class="text-body2" v-html="product.description"/>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Cancel" color="primary" outline v-close-popup/>
        <q-btn
          v-if="brand.phone"
          label="Fazer Pedido"
          icon="mdi-whatsapp"
          color="green-7"
          @click="handleSendWpp"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { formatCurrency } from 'src/utils/format'
import { openURL } from 'quasar';
import useApi from 'src/composables/UseApi';


defineOptions({
name: 'DialogProductDetails'
})

const props = defineProps<{
  show: {
    type: Boolean,
    required: true
  }
  product: {
    type: Object
  }
}>()

const emit = defineEmits<{
  (e: 'hideDialog'): void
}>()

const handleClose = () => {
  emit('hideDialog')
}
// const phone = '988000344'
const msg = `Olá, gostaria de fazer um pedido do produto ${props.product.name} por R$ ${props.product.price}.`
const { brand } = useApi()

const handleSendWpp = () => {
 const link = encodeURI(`https://api.whatsapp.com/send?phone=55${brand.value.phone}&text=${msg} - ${props.product.name}`)
 openURL(link)
}
</script>