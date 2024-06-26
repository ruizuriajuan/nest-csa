import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UserResponseDto, UpdateUserDto } from '../dto/index';
import { error } from 'console';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { RolService } from 'src/security/roles/services/rol.service';
import { Usuario } from '../entities/user.entity';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Usuario)
        private userRepo: Repository<Usuario>,
        private rolService: RolService
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

    async findByIds(ids: number[]) {
        return await this.userRepo.findBy({ id: In(ids) });
    }

    async findByEmail(email: string) {
        return await this.userRepo.findOne({ where: { email } });
    }

    async findRoles(id: number) {
        const subMenu = await this.userRepo.findOne({
            where: { id },
            relations: ['roles']
        });
        if (!subMenu) {
            throw new NotFoundException(`No existe el usuario: ${id}`)
        }
        return subMenu;
    }

    async create(data: CreateUserDto): Promise<UserResponseDto> {
        try {
            const { password, ...datosUsuario } = data;
            const existeEmail = await this.findByEmail(datosUsuario.email);
            if (existeEmail) {
                throw new BadRequestException(`Email duplicado: ${(existeEmail).email}`)
            }
            const newUser = this.userRepo.create(datosUsuario);
            if (data.rolList) {
                newUser.roles = await this.rolService.findByIds(data.rolList)
            }
            newUser.password = bcryptjs.hashSync(password, 10);
            await this.userRepo.save(newUser);
            return plainToInstance(UserResponseDto, newUser);
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, updateAuthDto: UpdateUserDto) {
        const oldUser = await this.findRoles(id);
        if (updateAuthDto.rolList) {
            let newRoles = updateAuthDto.rolList;
            let oldRoles = oldUser.roles.map(r => r.id);
            let setRoles = new Set(oldRoles);
            newRoles.forEach(id => setRoles.add(id));
            oldUser.roles = await this.rolService.findByIds([...setRoles]);
        }
        const { password, ...datosUsuario } = updateAuthDto;
        if (password) {
            oldUser.password = bcryptjs.hashSync(password, 10);
        }
        this.userRepo.merge(oldUser, updateAuthDto);
        await this.userRepo.save(oldUser);
        return plainToInstance(UserResponseDto, oldUser);
    }

    async remove(id: number) {
        try {
            const user = await this.findUserById(id);
            return this.userRepo.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async removeRol(id: number, idRol: number) {
        try {
            const usuario = await this.findRoles(id);
            usuario.roles = usuario.roles.filter(
                (rol) => rol.id !== idRol
            )
            return this.userRepo.save(usuario)
        } catch (error) {
            throw error;
        }
    }


}
