import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubMenuDto } from '../dto/submenu.dto';
import { SubMenuUpdateDto } from '../dto/submenuupdate.dto';
import { SubMenuService } from '../services/submenu.service';

@Controller('submenu')
export class SubMenuController {

    constructor(private readonly service: SubMenuService) { }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Post('crear')
    create(@Body() submenu: SubMenuDto) {
        return this.service.create(submenu);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() submenu: SubMenuUpdateDto) {
        return this.service.update(id, submenu);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.service.remove(id);
    }

}
