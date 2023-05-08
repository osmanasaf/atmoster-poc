import {get, post} from "./base.service";

const authUrl = 'posts'

export const getRequest = (param?: any) => {
    return get(authUrl, param);
}

export const postRequest = (body?: any, param?: any) => {
    return post('url', body, param);
}

export const getPosition = (positionID: number) => {
    return get(authUrl, positionID);
}


export const getRecourseDetail = (userId: number) => {
    return get(authUrl, userId);
}


export const adminRegister = () => {

}




