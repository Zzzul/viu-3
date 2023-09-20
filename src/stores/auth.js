import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useApi } from '../utils/api'
import { useAxios } from '../utils/axios'

const api = useApi()

export const useAuthStore = defineStore('auth', () => {
    const token = ref(null)
    const user = ref(null)
    const message = ref(null)

    const setToken = (newToken) => token.value = newToken
    const setUser = (newUser) => user.value = newUser
    const removeToken = () => token.value = null
    const removeUser = () => user.value = null
    const getToken = () => token.value
    const getUser = () => user.value
    const setMsg = (newMessage) => message.value = newMessage
    const getMsg = () => message.value
    const clearMsg = () => message.value = null

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
        await api.post('auth/login', { username, password })
            .then(res => {
                clearMsg()
                setToken(res.data.access_token)
                setMsg({
                    success: true,
                    message: 'Berhasil login'
                })
                getProfile()
            })
            .catch(({ response }) => {
                // handle error
                console.log(response.data)
                // alert(response.data.message)
                setMsg(response.data)
            })
    }

    const cobaLogin = async () => {
        await useAxios('POST', '/auth/login', {
            username: 'admin',
            password: 'admin'
        })
            .then(res => {
                console.log(res)
            })
    }

    const getProfile = async () => {
        await api.get('auth/me', { headers: { Authorization: 'Bearer ' + getToken() } })
            .then(res => {
                setUser(res.data)
            })
    }

    const register = (payload) => async () => {

    }

    const logout = async () => {
        if (!getToken()) {
            alert('Empty token')
        }

        await api.post('auth/logout', '', { headers: { Authorization: 'Bearer ' + getToken() } })
            .then(() => {
                clearState()
                setMsg({
                    success: true,
                    message: 'Berhasil logout'
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
        message,
        setMsg,
        getMsg,
        clearMsg
    }
})
