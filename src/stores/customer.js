import { ref } from 'vue'
import { defineStore } from 'pinia'
import customerJson from '../assets/data/customers.json'

export const useCustomerStore = defineStore(
    'customer',
    () => {
        const customers = ref(customerJson)

        const addCustomer = (customer) => {
            customers.value.push(customer)
        }

        return {
            customers,
            addCustomer
        }
    },
    {
        persist: true
    }
)
