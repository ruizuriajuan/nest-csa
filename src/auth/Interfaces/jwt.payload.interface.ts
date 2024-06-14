

export interface JwtPayload {

    id: number; //id usuario
    iat?: number; //fecha creacion
    exp?: number; //fecha expiracion
}