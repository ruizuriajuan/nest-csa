import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VistaService } from '../services/vista.service';
import { VistaUpdateDto } from '../dto/vistaupdate.dto';
import { VistaDto } from '../dto/vista.dto';

@Controller('vista')
export class VistaController {

    constructor(private readonly service: VistaService) { }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Post('crear')
    create(@Body() vista: VistaDto) {
        return this.service.create(vista);    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() vista: VistaUpdateDto) {
        return this.service.update(id, vista);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.service.remove(id);
    }



}
