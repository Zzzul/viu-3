import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL

/**
 * Axios
 * 
 * @param {string} method 
 * @param {string} url 
 * @param {any} body 
 * @param {string} token 
 * 
 * @return {api}
 */
export const useAxios = (method = 'GET', url, data, token = Object) => {
    const api = axios.request({
        headers: {
            Authorization: `Bearer ${token}`
        },
        method,
        url: baseURL + url,
        data
    })

    return api
}
