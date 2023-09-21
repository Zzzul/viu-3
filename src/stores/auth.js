import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useApi } from '../utils/api'
import { useFetch } from '../utils/fetch'
import { useRedirectStore } from "@/stores/redirect"
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
    const api = useApi()
    const redirectStore = useRedirectStore()
    const router = useRouter()

    const token = ref(null)
    const user = ref(null)
    const authInfo = ref(null)
    const isLoggedIn = ref(false)

    const setToken = (newToken) => token.value = newToken
    const setUser = (newUser) => user.value = newUser
    const removeToken = () => token.value = null
    const removeUser = () => user.value = null
    const getToken = () => token.value
    const getUser = () => user.value
    const setAuthInfo = (payload) => authInfo.value = payload
    const getAuthInfo = () => authInfo.value
    const clearAuthInfo = () => authInfo.value = null
    const setStatusLogin = (payload) => isLoggedIn.value = payload

    /**
    * Generates a header object with an Authorization token.
    *
    * @return {object} The header object with the Authorization token.
    */
    const setHeaderToken = () => {
        return { headers: { Authorization: 'Bearer ' + getToken() } }
    }

    /**
     * Clears the state by removing the token and user.
     * 
     * @return {void}
     */
    const clearState = () => {
        removeToken()
        removeUser()
    }

    /**
     * Logs in the user with the provided username and password.
     *
     * @param {string} username - The username of the user.
     * @param {string} password - The password of the user.
     * @return {void} void
     */
    const login = async (username, password) => {
        clearAuthInfo()

        await api.post('auth/login', { username, password })
            .then(res => {
                setToken(res.data.access_token)
                setAuthInfo({
                    success: true,
                    message: 'Berhasil login'
                })
                getProfile()
                setStatusLogin(true)
                if (redirectStore.getRedirectTo) {
                    console.log(redirectStore.getRedirectTo())
                    // useRedirectStore().setRedirectTo(null)
                    const toNameRoute = redirectStore.getRedirectTo().name
                    redirectStore.setRedirectTo(null)
                    router.push({
                        name: toNameRoute
                    })
                }
            })
            .catch(({ response }) => {
                // handle error
                console.log(response)
                // alert(response.message)
                setAuthInfo(response)
                setStatusLogin(false)
            })
    }

    const cobaLogin = async () => {
        await useFetch({
            method: 'post',
            url: '/auth/login',
            data: {
                username: 'admin',
                password: 'admin'
            }
        }).then(res => {
            console.log(res)
        })
    }

    /**
     * Retrieves the user profile from the server.
     *
     * @return {Promise<void>} A promise that resolves when the user profile is successfully retrieved.
     */
    const getProfile = async () => {
        await api.get('auth/me', setHeaderToken())
            .then(res => {
                setUser(res.data)
            })
    }

    const register = (payload) => async () => {

    }

    /**
     * Logs out the user.
     * 
     * @return {Promise<void>} - A promise that resolves when the user is logged out.
     */
    const logout = async () => {
        if (!getToken()) {
            alert('Empty token')
        }

        await api.post('auth/logout', '', setHeaderToken())
            .then(() => {
                clearState()
                setAuthInfo(null)
                setStatusLogin(false)
                router.push({
                    name: 'login'
                })
            })
    }

    return {
        token,
        user,
        setToken,
        setUser,
        removeToken,
        removeUser,
        getToken,
        getUser,
        clearState,
        login,
        register,
        getProfile,
        cobaLogin,
        logout,
        authInfo,
        setAuthInfo,
        getAuthInfo,
        clearAuthInfo,
        setHeaderToken,
        isLoggedIn,
        setStatusLogin,
    }
}, { persist: true })
