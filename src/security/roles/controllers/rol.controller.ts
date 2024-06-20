import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolDto } from '../dto/rol.dto';
import { RolUpdateDto } from '../dto/rolupdate.dto';
import { RolService } from '../services/rol.service';

@Controller('rol')
export class RolController {

    constructor(private readonly service: RolService) { }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Post('crear')
    create(@Body() rol: RolDto) {
        return this.service.create(rol);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() rol: RolUpdateDto) {
        return this.service.update(id, rol);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.service.remove(id);
    }



}
