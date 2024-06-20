import { PartialType } from '@nestjs/mapped-types';
import { VistaDto } from './vista.dto';


export class VistaUpdateDto extends PartialType(VistaDto) {}
