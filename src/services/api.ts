import axios from 'axios'
import type { ApiItem } from 'types'

/**
 * Axios instance for making API requests.
 */
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Request interceptor to add auth token to requests.
 */
api.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('authToken')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * Response interceptor to handle errors.
 */
api.interceptors.response.use(
  response => response,
  error => {
    /**
     * Handle 401 Unauthorized responses
     */
    const isUnauthorized = error.response && error.response.status === 401

    if (isUnauthorized) {
      /**
       * Clear auth data and redirect to login
       */
      sessionStorage.removeItem('authToken')

      sessionStorage.removeItem('user')

      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

/**
 * Fetches data from the API.
 */
export const fetchData = async () => {
  try {
    /**
     * Generate 2000 items using JSONPlaceholder API
     * Since the API doesn't have 2000 items, we'll duplicate the results
     */
    const response = await api.get<ApiItem[]>('/photos?_limit=100')

    const data = response.data

    /**
     * Duplicate data to reach 2000 items
     */
    let extendedData: ApiItem[] = []

    const multiplier = Math.ceil(2000 / data.length)

    for (let i = 0; i < multiplier; i++) {
      extendedData = [
        ...extendedData,
        ...data.map((item: ApiItem) => {
          /**
           * Ensure unique IDs by appending the index
           */
          const id = item.id + i * data.length

          const value: ApiItem = {
            ...item,
            id,
          }

          return value
        }),
      ]
    }

    return extendedData.slice(0, 2000)
  } catch (error) {
    console.error('Error fetching data:', error)

    throw error
  }
}

export default api
