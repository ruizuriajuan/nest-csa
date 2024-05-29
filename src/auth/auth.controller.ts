import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, UpdateAuthDto, loginDto } from './dto';
import { AuthGuard } from './guards/auth.guard';
import { User } from './entities/user.entity';
import { LoginResponse } from './Interfaces/login-response';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

//  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    console.log('ENTRAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    return this.authService.findAll();
  }
  /*
  @Post()
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  login(@Body() loginDto: loginDto) {
    return this.authService.login(loginDto);
  }

  

  @UseGuards(AuthGuard)
  @Get('check-token')
  checkToken(@Request() req: Request) : LoginResponse {
    const user = req['user'] as User;
    return{
      user,
      token : this.authService.getToken({id:user.id})
    } ;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
  */
}
