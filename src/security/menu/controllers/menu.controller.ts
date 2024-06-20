import { Get, Post, Body, Patch, Param, Delete, Controller } from '@nestjs/common';
import { MenuDto } from '../dto/menu.dto';
import { MenuUpdateDto } from '../dto/menuupdate.dto';
import { MenuService } from '../services/menu.service';


@Controller('menu')
export class MenuControler {

    constructor(private readonly service: MenuService) { }

    @Get()
    findAll() {
        return this.service.findAll();
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

}
