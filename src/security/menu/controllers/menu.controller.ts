import { Get, Post, Body, Patch, Param, Delete, Controller, ParseIntPipe } from '@nestjs/common';
import { MenuDto, MenuUpdateDto } from '../dto/menu.dto';
import { MenuService } from '../services/menu.service';


@Controller('menu')
export class MenuControler {

    constructor(private readonly service: MenuService) { }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findSubMenus(@Param('id') id: number) {
        return this.service.findSubMenus(id);
    }


    @Post('crear')
    create(@Body() menu: MenuDto) {
        return this.service.create(menu);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() menu: MenuUpdateDto) {
        return this.service.update(id, menu);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.service.remove(id);
    }

    @Delete(':id/submenu/:idSubmenu')
    removeSubmenu(
        @Param('id') id: number,
        @Param('idSubmenu', ParseIntPipe) idSubmenu: number) {
        return this.service.removeSubMenu(id, idSubmenu);
    }

}
