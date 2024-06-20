import { PartialType } from '@nestjs/mapped-types';
import { MenuDto } from './menu.dto';


export class MenuUpdateDto extends PartialType(MenuDto) {}
