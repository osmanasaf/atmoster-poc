import LoginCredentials from "../dto/LoginDto";
import {get, post, put} from "./base.service";
import VerifyOtp from "../dto/VerifyOtp";
import RegisterCredentials from "../dto/RegisterCredentials";

export const login = (credentials: LoginCredentials) =>
    post("/auth/login-first-step", credentials);

export const verifyOtp = (credentials: VerifyOtp) =>
    put("/auth/login-verification", credentials);

export const register = (credentials: RegisterCredentials) =>
    post("/auth/register-first-step", credentials);

export const forgotPassword = (email: string) =>
    get("/auth/forgot-and-change-password-link-first-step", {email});

export const isEmailExist = (email: String) =>
    get("/auth/exist/" + email);

export const verifyRegister = (email: string, otp: string) =>
    put("/auth/register-verification/mail/" + email + '/code/' + otp);

