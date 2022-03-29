import axios, { AxiosRequestConfig , AxiosResponse, AxiosError } from 'axios'
import router from './router'
import { Notification } from 'element-ui'
import store from '@/store/index'

axios.defaults.baseURL = process.env.VUE_APP_BASE_API

const request = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': "application/json; charset=utf-8"
    }

})

request.interceptors.request.use((config: any) => {
    config.headers['Authorization'] = localStorage.getItem("token")
    return config
})

request.interceptors.response.use((response: any) => {
    let res = response.data

    if(res.code === 200) {
        return response
    } else {
        Notification.error({
            title: 'Failure',
            message: res.msg
        })
        store.commit('resetState', '')
    }
    }, (error: AxiosError) => {
        if (error.response && error.response.data) {
            error.message = error.response.data.msg
        }

        if (error.response && error.response.status === 401) {
            router.push("/login")
        }
        Notification.error(error.message)
        return Promise.reject(error)

    })

export default request