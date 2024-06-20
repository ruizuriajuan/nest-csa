import { PartialType } from '@nestjs/mapped-types';
import { SubMenuDto } from './submenu.dto';


export class SubMenuUpdateDto extends PartialType(SubMenuDto) {}
