<<template>
  <q-page padding>
  <div class="row">
    <q-table
      title="Product"
      :rows="products"
      :columns="columnsProduct"
      row-key="id"
      class="col-12"
      :loading="loading"
    >
      <template v-slot:top>
      <span class="text-h6">
        Product
      </span>
      <q-btn
        label="My store"
        dense
        outline
        size="sm"
        class="q-ml-sm"
        icon="mdi-store"
        color="primary"
        @click="handleGoToStore"
       />
      <q-btn
        label="Copy URL"
        dense
        outline
        size="sm"
        class="q-ml-sm"
        icon="mdi-content-copy"
        color="primary"
        @click="handleCopyPublicUrl"
       />
      <q-space/>
      <q-btn
        v-if="$q.platform.is.desktop"
        label="Add New"
        color="primary"
        icon="mdi-plus"
        :to = "{ name: 'form-product' }"
      />
      </template>
      <template v-slot:body-cell-img_url="props">
        <q-td :props="props">
          <q-avatar v-if="props.row.img_url">
            <img :src="props.row.img_url"/>
          </q-avatar>
          <q-avatar v-else color="grey" text-color="white" icon="mdi-image-off" />
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-x-sm">
        <q-btn icon="mdi-pencil-outline" color="info" dense size="sm" @click="handleEdit(props.row)">
          <q-tooltip>Edit</q-tooltip>
        </q-btn>
        <q-btn icon="mdi-delete-outline" color="negative" dense size="sm" @click="handleRemoveProduct(props.row)">
          <q-tooltip>Delete</q-tooltip>
        </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn v-if="$q.platform.is.mobile" fab icon="mdi-plus" color="primary" :to = "{ name: 'form-product' }"/>
  </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
import  { ref, onMounted } from 'vue';
import useApi from 'src/composables/UseApi';
import useNotify from 'src/composables/UseNotify';
import { useRouter } from 'vue-router';
import { useQuasar, openURL, copyToClipboard } from 'quasar';
import { columnsProduct } from './table';
import useAuthUser from 'src/composables/UseAuthUser';


defineOptions({
  name: 'PageProductList'
})

const products = ref([])
const loading = ref(true)
const router = useRouter()
const $q = useQuasar()
const table = 'product'

const { listPublic, remove } = useApi()
const { user } = useAuthUser()
const { notifyError, notifySuccess } = useNotify()

const handleListProducts = async () => {
  try {
    loading.value = true
    products.value = await listPublic(table, user.value.id)
    console.log('Loaded products:', products.value)

    loading.value = false
  } catch (error) {
    notifyError(error.message)
  }
}

const handleEdit = (product) => {
  router.push({ name: 'form-product', params: { id: product.id }})
}

const handleRemoveProduct = async (product) => {
  try {
    $q.dialog({
      title: "Confirm",
      message: `Do you want to delete ${product.name}?`,
      cancel: true,
      persistent: true
    }).onOk(async () => {
      await remove(table, product.id)
      notifySuccess('Successfully deleted')
      handleListProducts()
    })
  } catch (error) {
    notifyError(error.message)
  }
}

const handleGoToStore = () => {
  const userId = user.value.id
  const link = router.resolve({ name: 'product-public', params: { id: userId }})
  // router.push({ name: 'product-public', params: { id: userId }})
  openURL(window.origin + link.href)
}

const handleCopyPublicUrl = () => {
  const userId = user.value.id
  const link = router.resolve({ name: 'product-public', params: { id: userId }})
  const externalLink = window.origin + link.href
  copyToClipboard(externalLink)
  .then(() => {
    notifySuccess('Public URL copied to clipboard')
  })
  .catch(() => {
    notifyError('Failed to copy URL')
  })
}

onMounted(() => {
  handleListProducts()
  console.log(products.value)
})
</script>