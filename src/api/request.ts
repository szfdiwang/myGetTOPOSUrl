import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',
  withCredentials: false,
  timeout: 1000 * 60 * 5,
  headers: {
    'Timezone-Code': `GMT+${new Date().getTimezoneOffset() / -60}`
  }
})

// request interceptor
instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// response interceptor
instance.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.head?.code === '200') {
      response.data = res.body
      return response
    }
    const msg = res.head?.msg || 'Error'
    return Promise.reject(res.head)
  },
  (error) => {
    return Promise.reject(error.message)
  }
)

export default instance
