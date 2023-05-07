import LoginCredentials from "../dto/LoginDto";
import {get, post} from "./base.service";
import VerifyOtp from "../dto/VerifyOtp";
import ChangePasswordDto from "../dto/ChangePasswordDto";

const authUrl = 'posts'
export const login = (credentials: LoginCredentials) =>
    post("/auth/login-first-step", credentials);

export const verifyOtp = (credentials: VerifyOtp) =>
    post("/auth/login-verification", credentials);

export const register = (credentials: LoginCredentials) =>
    post("/auth/register", credentials);

export const forgotPassword = (email: string) =>
    get("/auth/forgot-and-change-password-link-first-step", { email });

export const changeForgotPassword = (credentials: { newPassword: string }, token: string) =>
    post("change-password/token/" + token , { credentials});


export const getPosition = (positionID: number) => {
    return get(authUrl, positionID);
}


export const getRecourseDetail = (userId: number) => {
    return get(authUrl, userId);
}

export const getRequest = (param?: any) => {
    return get(authUrl, param);
}

export const postRequest = (body?: any, param?: any) => {
    return post('url', body, param);
}