import axios from 'axios'


/**
 * Initialize Axios instance to call the API
 * @returns {AxiosInstance}
 */
export const useApi = () => {
	const baseURL = import.meta.env.VITE_API_BASE_URL

	const axiosInstance = axios.create({
		baseURL
	})

	return axiosInstance
}