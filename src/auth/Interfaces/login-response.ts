import { Usuario } from "../entities/user.entity";

export interface LoginResponse {
    user: Usuario;
    token: string
}