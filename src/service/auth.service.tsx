import LoginCredentials from "../dto/LoginDto";
import {get, post, put} from "./base.service";
import VerifyOtp from "../dto/VerifyOtp";
import ChangePasswordDto from "../dto/ChangePasswordDto";
import RegisterCredentials from "../dto/RegisterCredentials";

const authUrl = 'posts'
export const login = (credentials: LoginCredentials) =>
    post("/auth/login-first-step", credentials);

export const verifyOtp = (credentials: VerifyOtp) =>
    put("/auth/login-verification", credentials);

export const register = (credentials: RegisterCredentials) =>
    post("/auth/register-first-step", credentials);

export const forgotPassword = (email: string) =>
    get("/auth/forgot-and-change-password-link-first-step", { email });

export const changeForgotPassword = (credentials: { newPassword: string }, token: string) =>
    post("change-password/token/" + token , { credentials});

export const isEmailExist = (email: String) =>
    get("/auth/exist/" + email);

export const verifyRegister = (email: string, otp: string) =>
    put("/auth/register-verification/mail/" + email + '/code/' + otp);

export const getPosition = (positionID: number) => {
    return get(authUrl, positionID);
}


export const getRecourseDetail = (userId: number) => {
    return get(authUrl, userId);
}

export const getRequest = (param?: any) => {
    return get(authUrl, param);
}

export const adminRegister = () => {

}



export const postRequest = (body?: any, param?: any) => {
    return post('url', body, param);
}