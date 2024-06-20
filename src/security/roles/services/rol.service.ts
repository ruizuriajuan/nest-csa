import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from '../entities/rol.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { RolDto, RolResponseDto } from '../dto/rol.dto';
import { RolUpdateDto } from '../dto/rolupdate.dto';

@Injectable()
export class RolService {
    constructor(
        @InjectRepository(Rol)
        private repository: Repository<Rol>
    ) { }

    async findAll() {
        return await this.repository.find();
        //return plainToInstance(RolResponseDto, data);
    }

    async findByName(nombre: string) {
        return await this.repository.findOne({ where: { nombre } });
    }

    async findById(id: number) {
        const rol = await this.repository.findOneBy({ id });
        if (!rol) {
            throw new NotFoundException(`No existe el rol: ${id}`)
        }
        return rol;
    }

    async create(data: RolDto): Promise<RolResponseDto> {
        try {
            const existe = await this.findByName(data.nombre);
            if (existe) {
                throw new BadRequestException(`Rol duplicado: ${(existe).nombre}`);
            }
            const newRol = await this.repository.create(data);
            await this.repository.save(newRol);
            return plainToInstance(RolResponseDto, newRol);
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, rol: RolUpdateDto) {
        const oldRol = await this.findById(id);
        this.repository.merge(oldRol, rol);
        const rolMerged = await this.repository.save(oldRol);
        return rolMerged;
    }

    async remove(id: number) {
        try {
            const rol = await this.findById(id);
            return this.repository.delete(id);
        } catch (error) {
            throw error;
        }
    }
}
