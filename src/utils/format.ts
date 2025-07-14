import { toValue } from "vue"

const formatCurrency = (value) => {
    const formatted = toValue(value).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })

    return formatted
}

export {
    formatCurrency
}