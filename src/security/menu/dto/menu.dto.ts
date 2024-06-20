import { Exclude, Expose } from "class-transformer";
import { IsString } from "class-validator";

export class MenuDto {
    @IsString()
    nombre: string;

    @IsString()
    descripcion: string;  
}

export class MenuResponseDto {
    @Expose()
    nombre: string;
  
    @Expose()
    descripcion: string;
   
    constructor(partial: Partial<MenuResponseDto>) {
      Object.assign(this, partial);
    }
  }