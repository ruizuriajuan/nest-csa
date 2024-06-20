import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UserResponseDto, UpdateUserDto } from '../dto/index';
import { plainToInstance } from 'class-transformer';

import { error } from 'console';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Usuario)
        private userRepo: Repository<Usuario>
    ) { }

    async findAll() {
        const data = await this.userRepo.find();
        return plainToInstance(UserResponseDto, data);
    }

    async findUserById(id: number) {
        const user = await this.userRepo.findOneBy({ id });
        if (!user) {
            throw new NotFoundException(`No existe el usuario con id: ${id}`)
        }
        //const { password, ...resto } = user;
        return user;
    }

    async findByEmail(email: string) {
        return await this.userRepo.findOne({ where: { email } });
    }

    async create(data: CreateUserDto): Promise<UserResponseDto> {
        try {
            const { password, ...datosUsuario } = data;
            const existeEmail = await this.findByEmail(datosUsuario.email);
            if (existeEmail) {
                throw new BadRequestException(`Email duplicado: ${(existeEmail).email}`)
            }
            const newUser = this.userRepo.create(datosUsuario);
            newUser.password = bcryptjs.hashSync(password, 10);
            await this.userRepo.save(newUser);
            return plainToInstance(UserResponseDto, newUser);
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, updateAuthDto: UpdateUserDto) {
        const oldUser = await this.findUserById( id );
        this.userRepo.merge(oldUser, updateAuthDto);
        await this.userRepo.save(oldUser);
        return plainToInstance(UserResponseDto, oldUser);
    }

    async remove(id: number) {
        try {
            const user = await this.findUserById( id );
            return this.userRepo.delete(id);
        } catch (error) {
            throw error;
        }
    }


}
