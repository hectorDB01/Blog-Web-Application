const axios = require('axios')
const { error } = require('./jsend')
const { response } = require('express')

const api = axios.create({
    baseURL: "http://localhost:3000/api/v1/login"
})

api.interceptors.request.use( (config) => {
    const accessToken = localStorage.getItem('accessToken')
    if(accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
}, (error) => Promise.reject(error) )

api.interceptors.response.use (
    (response) => response, async (error) => {
        if (error.response && error.response.status === 401) {
            const originalRequest = error.config //Save the original request
            if(!originalRequest._retry) {
                originalRequest._retry = true
                try {
                    const refreshToken = localStorage.getItem('refreshToken')
                    const { data } = await axios.post('http://localhost:3000/token', { refreshToken })
                    localStorage.getItem('accessToken', data.accessToken)
                    originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`
                    return api(originalRequest) 
                } catch (refreshError) {
                    console.error('Refresh token expired. Please log in again.')
                }
            }
        } 
        return Promise.reject(error)
    }
)

export default api