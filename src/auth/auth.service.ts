import { Injectable, UnauthorizedException } from '@nestjs/common';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './Interfaces/jwt.payload.interface';
import * as bcryptjs from 'bcryptjs';
import { UserService } from 'src/security/users/services/user.service';



@Injectable()
export class AuthService {

  constructor(
    private userService: UserService, 
    private jwtService: JwtService
  ) { }

  
  async login(loginDto: loginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciales invalidas : email')
    }

    if (!bcryptjs.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credenciales invalidas : password')
    }

    const { password: _renombrando, ...data } = user;
    return {
      user: data,
      token: this.getToken({ id: user.id })
    }

  }

 
  getToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token
  }


}
