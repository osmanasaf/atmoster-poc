export interface AdminRegisterDto {
    username: string,
    name: string,
    surname: string,
    mail: string,
    msisdn: string,
    password: string
}

export interface AdminGetTokenDto {
    username: string,
    password: string,
}
