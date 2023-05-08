import axios from "axios";
import {environment} from "../environment/environment";

const token = localStorage.getItem('token')
const baseService = axios.create({
    baseURL: environment.baseApiUrlAuth,
    headers: {
        'Accept': 'application/json',
        'Accept-Language': 'es',
        'Content-Type': 'application/json',
    },
    withCredentials: true
})

const baseServicePosition = axios.create({
    baseURL: environment.baseApiUrlPosition,
    headers: {
        'Accept': 'application/json',
        'Accept-Language': 'es',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
    },
    withCredentials: true
})


baseService.interceptors.response.use(
    function (response) {
        // Return unwrapped response ---the "body" of it
        return response.data;
    },
    function (error) {
        // TODO: Do proper error handling here (logout user, etc)
        console.error(error)
    }
)
export const getPosition = (url: string, params?: {}) => {
    if (params) {
        return baseServicePosition.get(url, {params})
    } else {
        return baseServicePosition.get(url)
    }
}

export const deletePositions = (url: string, params?: {}) => {
    if (params) {
        return baseServicePosition.delete(url, {params})
    } else {
        return baseServicePosition.delete(url)
    }
}

export const postPosition = (url: string, body?: {}, params?: {}) => {
    if (params) {
        return baseServicePosition.post(url, body, {params})
    } else {
        return baseServicePosition.post(url, body)
    }
}

export const putPositions = (url: string, body?: {}, params?: {}) => {
    if (params) {
        return baseServicePosition.put(url, body, {params})
    } else {
        return baseServicePosition.put(url, body)
    }
}


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
