import { PartialType } from "@nestjs/mapped-types";
import { Expose } from "class-transformer";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class SistemaDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  @IsString()
  url: string;

/*  @IsArray()
  @IsNotEmpty()
  //@ApiPropert()
  readonly menus: number[]
  */

}

export class SistemaResponseDto {
  @Expose()
  nombre: string;

  @Expose()
  descripcion: string;

  @Expose()
  url: string;

  constructor(partial: Partial<SistemaResponseDto>) {
    Object.assign(this, partial);
  }
}

export class SistemaUpdateDto extends PartialType(SistemaDto) {}