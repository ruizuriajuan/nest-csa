import { Exclude, Expose } from "class-transformer";
import {  IsInt, IsString, MaxLength, MinLength} from "class-validator";

export class SubMenuDto {
    @IsString()
    nombre: string;

    @IsString()
    sigla: string;  

    @IsString()
    url: string;  

    @IsInt()
    orden: number;
}

export class SubMenuResponseDto {
    @Expose()
    nombre: string;
  
    @Expose()
    sigla: string;

    @Exclude()
    url: string;

    @Expose()
    orden: string;
   
    constructor(partial: Partial<SubMenuResponseDto>) {
      Object.assign(this, partial);
    }
  }