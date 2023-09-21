import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL

/**
 * Creates a custom hook for making API requests.
 *
 * @param {Object} options - The options for the API request.
 * @param {string} options.method - The HTTP method for the request.
 * @param {string} options.url - The URL for the request.
 * @param {Object} options.data - The data to send with the request.
 * @param {Object} options.params - The query parameters for the request.
 * @param {string} options.token - The authentication token for the request.
 * @param {Object} options.customHeaders - Any custom headers for the request.
 * @return {Promise} - A promise that resolves to the API response.
 */
export const useFetch = ({ method, url, data, params, token, customHeaders }) => {
    const api = axios.request({
        headers: {
            ...customHeaders,
            Authorization: `Bearer ${token}`
        },
        method,
        url: baseURL + url,
        data,
        params
    })

    return api
}
