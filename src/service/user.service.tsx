import {get, post, put} from "./base.service";
import {RoleEnum} from "../dto/role.enum";

export const registerUser = () => {
    return get('user/all-dealer-employee')
}

export const userUpdateRole = (username: string, role: RoleEnum) => {
    return put(`user/modify/username/${username}/ou/${role}`)
}

export const changeForgotPassword = (credentials: { newPassword: string }, token: string) =>
    post('user/change-password/token/' + token, {credentials});

