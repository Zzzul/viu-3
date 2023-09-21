import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFilterProductStore = defineStore('filterProduct', () => {
    const categoryId = ref(0)
    const search = ref('')

    return {
        categoryId,
        search
    }
},{
    persist: true
})
