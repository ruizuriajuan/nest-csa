import { PartialType } from '@nestjs/mapped-types';
import { RolDto } from './rol.dto';


export class RolUpdateDto extends PartialType(RolDto) {}
