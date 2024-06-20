import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UsersController {

    constructor(private readonly userService: UserService ) { }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Post('crear')
    create(@Body() createAuthDto: CreateUserDto) {
        return this.userService.create(createAuthDto);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateAuthDto: UpdateUserDto) {
        return this.userService.update(id, updateAuthDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.userService.remove(id);
    }
}
