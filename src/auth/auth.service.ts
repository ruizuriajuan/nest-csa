import { BadRequestException, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, UserResponseDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

import { User } from './entities/user.entity';

import * as bcryptjs from 'bcryptjs';
import { plainToInstance } from 'class-transformer';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './Interfaces/jwt.payload.interface';
import { Client } from 'pg';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService
  ) { }

  /*async create(createAuthDto: CreateUserDto): Promise<UserResponseDto> {
    try {
      const { password, ...datosUsuario } = createAuthDto;
      const nuevo = new this.userRepo({
        password: bcryptjs.hashSync(password, 10),
        ...datosUsuario
      });
      await nuevo.save();
      return plainToInstance(UserResponseDto, nuevo.toObject());

    } catch (error) {
      if (error.code == 11000) {
        throw new BadRequestException(`${createAuthDto.email} ya existe`)
      }
      throw new InternalServerErrorException('Error al crear usuario');
    }
  }


  async login(loginDto: loginDto) {
    const { email, password } = loginDto;
    const user = await this.userRepo.findOne({ email: email });
    if (!user) {
      throw new UnauthorizedException('Credenciales invalidas : email')
    }

    if (!bcryptjs.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credenciales invalidas : password')
    }

    const { password: _renombrando, ...data } = user.toJSON();
    return {
      user: data,
      token: this.getToken({ id: user.id })
    }

  }

  async findUserById(id: string) {
    const user = await this.userRepo.findById(id);
    const { password, ...resto } = user.toJSON();
    return resto;
  }*/

  getToken(payload: JwtPayload) {
    console.log('getToken:::', payload);
    const token = this.jwtService.sign(payload);
    return token
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
