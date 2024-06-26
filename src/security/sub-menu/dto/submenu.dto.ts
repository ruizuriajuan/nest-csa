import { Exclude, Expose } from "class-transformer";
import {  IsArray, IsInt, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";

export class SubMenuDto {
    @IsString()
    nombre: string;

    @IsString()
    sigla: string;  

    @IsString()
    baseUrl: string;  

    @IsInt()
    orden: number;

    @IsArray()
    //@IsNotEmpty()
    //@ArrayMinSize(1) //se obliga a que tenga un elemento si es nece.
    //@ApiProperty()
    vistaList: number[];
  
}

export class SubMenuResponseDto {
    @Expose()
    nombre: string;
  
    @Expose()
    sigla: string;

    @Exclude()
    baseUrl: string;

    @Expose()
    orden: string;

      
    constructor(partial: Partial<SubMenuResponseDto>) {
      Object.assign(this, partial);
    }
  }