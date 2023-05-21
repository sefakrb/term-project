import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_URL

const axiosInstance = axios.create({
   baseURL: BASE_URL,
})

export default axiosInstance
