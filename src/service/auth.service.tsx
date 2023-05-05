import {get, post} from "./base.service";

const authUrl = 'posts'

export const getRequest = (param?: any) => {
    return get(authUrl, param);
}

export const postRequest = (body?: any, param?: any) => {
    return post('url', body, param);
}

export const getPosition = (positionID: string) => {
    return get(authUrl, positionID);
}




