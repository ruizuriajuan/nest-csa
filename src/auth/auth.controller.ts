import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './auth.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { loginDto } from './dto/login.dto';
import { LoginResponse } from './Interfaces/login-response';
import { Usuario } from 'src/security/users/entities/user.entity';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  
  @Post('login')
  login(@Body() loginDto: loginDto) {
    return this.authService.login(loginDto);
  }
  
  
  @UseGuards(AuthGuard)
  @Get('check-token')
  checkToken(@Request() req: Request) : LoginResponse {
    const user = req['user'] as Usuario;
    return{
      user,
      token : this.authService.getToken({id:user.id})
    } ;
  } 
  
}
