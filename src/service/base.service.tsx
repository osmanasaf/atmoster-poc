import axios from "axios";
import {environment} from "../environment/environment";

const baseService = axios.create({
    baseURL: environment.baseApiUrl,
    headers: {
        'Accept': 'application/json',
        'Accept-Language': 'es',
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

baseService.interceptors.response.use(
    function (response) {
        // Return unwrapped response ---the "body" of it
        return response.data
    },
    function (error) {
        // TODO: Do proper error handling here (logout user, etc)
        console.error(error)
    }
)
export const get = (url: string, params?: {}) => {
    if (params) {
        return baseService.get(url, {params})
    } else {
        return baseService.get(url)
    }
}

export const deletes = (url: string, params?: {}) => {
    if (params) {
        return baseService.delete(url, {params})
    } else {
        return baseService.delete(url)
    }
}

export const post = (url: string, body?: {}, params?: {}) => {
    if (params) {
        return baseService.post(url, body, {params})
    } else {
        return baseService.post(url, body)
    }
}

export const put = (url: string, body?: {}, params?: {}) => {
    if (params) {
        return baseService.put(url, body, {params})
    } else {
        return baseService.put(url, body)
    }
}
