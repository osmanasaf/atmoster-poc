import {RoleEnum} from "./role.enum";

interface UserDto {
    cn: string,
    ou: RoleEnum,
    password: string,
    mail: string
}

export default UserDto
