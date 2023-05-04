import {get, post} from "./base.service";

const authUrl = 'auth'

export const getRequest = (url: string, param?: any) => {
    return get(authUrl + url, param);
}

export const postRequest = (url: string, body?: any, param?: any) => {
    return post(url, body, param);
}



