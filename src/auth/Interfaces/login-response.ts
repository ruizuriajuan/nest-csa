import { Usuario } from "src/security/users/entities/user.entity";




export interface LoginResponse {
    user: Usuario;
    token: string
}