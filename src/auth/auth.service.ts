import { BadRequestException, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, UserResponseDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

import { Usuario } from './entities/user.entity';

import * as bcryptjs from 'bcryptjs';
import { plainToInstance } from 'class-transformer';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './Interfaces/jwt.payload.interface';
import { Client } from 'pg';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { error } from 'console';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Usuario)
    private userRepo: Repository<Usuario>,
    private jwtService: JwtService
  ) { }

  async findAll() {
    return await this.userRepo.find();
  }

  async create(data: CreateUserDto): Promise<UserResponseDto> {
    try {
      const { password, ...datosUsuario } = data;
      const newUser = this.userRepo.create(datosUsuario);
      newUser.password = bcryptjs.hashSync(password, 10);
      await this.userRepo.save(newUser);
      return plainToInstance(UserResponseDto, newUser);
    } catch (error) {
      console.log('Error al crear usuario', error);
      throw new InternalServerErrorException('Error al crear usuario');
    }
  }

  async update(id: number, updateAuthDto: UpdateAuthDto) {
    const oldUser = await this.userRepo.findOneBy({ id });
    this.userRepo.merge(oldUser, updateAuthDto);
    return this.userRepo.save(oldUser);
  }

  async remove(id: number) {
    try {
      const user = await this.userRepo.findOneBy({ id });
      if (user)
        return this.userRepo.delete(id);
      else
        throw error(`No existe el usuario con id: ${id}`)
    } catch (error) {
      console.log('Error al eliminar usuario', error);
      throw new InternalServerErrorException('Error al eliminar usuario');
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
    }
  
    getToken(payload: JwtPayload) {
      const token = this.jwtService.sign(payload);
      return token
    }
  
   
  
    async findOne(id: number) {
      const user = await this.userRepo.findOneBy({ id });
      return user;
    }
  
    
}
