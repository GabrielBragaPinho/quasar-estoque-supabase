import { formatCurrency } from 'src/utils/format'
import { ref } from 'vue'
export const columnsProduct = [
  { name: 'img_url', align: 'left', label: 'Img', field: 'img_url', sortable: false },
  { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
  { name: 'amount', align: 'left', label: 'Amount', field: 'amount', sortable: true },
  { name: 'price', align: 'left', label: 'Price', field: 'price', format: (val) => formatCurrency(val), sortable: true },
  { name: 'actions', align: 'right', label: 'Actions', field: 'actions', sortable: false },
]

export const initialPagination = ref({
  page: 1,
  rowsPerPage: 8,
})