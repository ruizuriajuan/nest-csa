import { PartialType } from "@nestjs/mapped-types";
import { Exclude, Expose } from "class-transformer";
import { IsArray, IsString } from "class-validator";

export class MenuDto {
    @IsString()
    nombre: string;

    @IsString()
    descripcion: string;
    
    @IsArray()
    subMenuList: number[];

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

  export class MenuUpdateDto extends PartialType(MenuDto) {}