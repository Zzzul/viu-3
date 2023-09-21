import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRedirectStore = defineStore('redirect', () => {
    const redirectTo = ref(null)
    const setRedirectTo = (payload) => redirectTo.value = payload
    const getRedirectTo = () => redirectTo.value

    return { redirectTo, setRedirectTo, getRedirectTo }
}, { persist: true })
