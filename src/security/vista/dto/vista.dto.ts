import { PartialType } from "@nestjs/mapped-types";
import { Exclude, Expose } from "class-transformer";
import { IsEmail, IsInt, IsString, MaxLength, MinLength } from "class-validator";

export class VistaDto {
    @IsString()
    nombre: string;

    @IsString()
    pagina: string;  

    @IsInt()
    orden: number;  
}

export class VistaResponseDto {
    @Expose()
    nombre: string;
  
    @Expose()
    pagina: string;

    @Expose()
    orden: number;  
   
    constructor(partial: Partial<VistaResponseDto>) {
      Object.assign(this, partial);
    }
  }

  export class VistaUpdateDto extends PartialType(VistaDto) {}