import { useQuasar } from "quasar";

export default function useNotify () {
    const $q = useQuasar()

    const notifySuccess = (message) => {
        $q.notify({
          type: 'positive',
          message: message || 'Success.'
        })
    }
   const notifyError = (message) => {
        $q.notify({
          type: 'negative',
          message: message || 'Failed.'
        })
    }

    return {
        notifySuccess,
        notifyError
    }
}