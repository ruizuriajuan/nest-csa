import { Exclude, Expose } from "class-transformer";
import { IsArray, IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class RolDto {
    @IsString()
    nombre: string;

    @IsString()
    descripcion: string;  

    @IsArray()
    usuarioList : number[];

    @IsArray()
    vistaList: number[];

}

export class RolResponseDto {
    @Expose()
    nombre: string;
  
    @Expose()
    descripcion: string;
   
    constructor(partial: Partial<RolResponseDto>) {
      Object.assign(this, partial);
    }
  }