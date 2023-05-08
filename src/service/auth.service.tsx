import LoginCredentials from "../dto/LoginDto";
import {get, post, put} from "./base.service";
import VerifyOtp from "../dto/VerifyOtp";
import ChangePasswordDto from "../dto/ChangePasswordDto";
import RegisterCredentials from "../dto/RegisterCredentials";
import {RoleEnum} from "../dto/role.enum";
import {ApproveDto} from "../dto/PositionDto";

export const login = (credentials: LoginCredentials) =>
    post("/auth/login-first-step", credentials);

export const verifyOtp = (credentials: VerifyOtp) =>
    put("/auth/login-verification", credentials);

export const register = (credentials: RegisterCredentials) =>
    post("/auth/register-first-step", credentials);

export const forgotPassword = (email: string) =>
    get("/auth/forgot-and-change-password-link-first-step", {email});

export const changeForgotPassword = (credentials: { newPassword: string }, token: string) =>
    post("change-password/token/" + token, {credentials});

export const isEmailExist = (email: String) =>
    get("/auth/exist/" + email);

export const verifyRegister = (email: string, otp: string) =>
    put("/auth/register-verification/mail/" + email + '/code/' + otp);

export const registerUser = () => {
    return get('user/all-dealer-employee')
}

export const userUpdateRole = (username: string, role: RoleEnum) => {
    return put(`user/modify/username/${username}/ou/${role}`)
}


export const openPositions = () => {
    return get('position/all-open-positions');
}

export const getAllPosition = (positionID: string) => {
    return get('', positionID);
}

export const getPositionDetail = (positionID: string) => {
    return get(`position/id/${positionID}/applies'`)
}

export const updateUserHr = (userId: string, approve: ApproveDto) => {
    return put(`position/position-apply/id/${userId}/hr-approve`, approve)
}

export const updateUserTechnical = (userId: string, approve: ApproveDto) => {
    return put(`position/position-apply/id/${userId}/tech-approve`, approve)
}

export const updateUserUcretlendirmePersonel= (userId: string, approve: ApproveDto) => {
    return put(`position/position-apply/id/${userId}/finance-approve`, approve)
}


export const getRecourseDetail = (userId: number) => {
    return get('', userId);
}

export const getRequest = (param?: any) => {
    return get('', param);
}
