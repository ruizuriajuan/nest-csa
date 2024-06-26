import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { SistemaService } from '../services/sistema.service';
import { SistemaDto, SistemaUpdateDto } from '../dto/sistema.dto';

@Controller('sistema')
export class SistemaController {

    constructor(private readonly service: SistemaService) { }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findMenus(@Param('id') id: number) {
        return this.service.findMenus(id);
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

    @Delete(':id/menu/:idMenu')
    removeMenu(
        @Param('id') id: number,
        @Param('idMenu', ParseIntPipe) idMenu: number) {
        return this.service.removeMenu(id, idMenu);
    }


}
