import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFilterProductStore = defineStore('filter_product', () => {
    const categoryId = ref(0)
    const search = ref('')

    return {
        categoryId,
        search
    }
},{
    persist: true
})
