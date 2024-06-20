import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SistemaService } from '../services/sistema.service';
import { SistemaDto } from '../dto/sistema.dto';
import { SistemaUpdateDto } from '../dto/sistemaupdate.dto';

@Controller('sistema')
export class SistemaController {

    constructor(private readonly service: SistemaService) { }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Post('crear')
    create(@Body() sistema: SistemaDto) {
        return this.service.create(sistema);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() sistema: SistemaUpdateDto) {
        return this.service.update(id, sistema);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.service.remove(id);
    }

}
