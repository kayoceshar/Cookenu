export type user = {
    id:string ,
    name:string ,
    email:string ,
    password:string ,
    role:string
}

export enum UserRole {
    ADMIN = "ADMIN",
    NORMAL = "NORMAL"
}

export interface AuthenticationData {
    id:string;
    role:string;
}

export interface UserInputDTO{
    name:string,
    email:string,
    password:string,
    role:string
}

export interface LoginDTO{
    email:string,
    password:string,
}

export interface UserGetByIdDTO{
    id: string,
    token:string
}

export interface InputForgotPassword{
    id:string,
    password:string,
}

export interface UserForgotPasswordDTO{
    email:string,
    password:string,
    token: string
}
