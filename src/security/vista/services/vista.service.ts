import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { Vista } from '../entities/vista.entity';
import { VistaDto, VistaResponseDto, VistaUpdateDto } from '../dto/vista.dto';

@Injectable()
export class VistaService {
    constructor(
        @InjectRepository(Vista)
        private repository: Repository<Vista>
    ) { }

    async findAll() {
        return await this.repository.find();
    }

    async findByName(nombre: string) {
        return await this.repository.findOne({ where: { nombre } });
    }

    async findById(id: number) {
        const vista = await this.repository.findOneBy({ id });
        if (!vista) {
            throw new NotFoundException(`No existe la pagina: ${id}`)
        }
        return vista;
    }

    async findByIds(ids: number[]) {
        return await this.repository.findBy({ id: In(ids) });
    }

    async create(data: VistaDto): Promise<VistaResponseDto> {
        try {
            const existe = await this.findByName(data.nombre);
            if (existe) {
                throw new BadRequestException(`pagina duplicada: ${(existe).nombre}`);
            }
            const newVista = await this.repository.create(data);
            await this.repository.save(newVista);
            return plainToInstance(VistaResponseDto, newVista);
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, change: VistaUpdateDto) {
        const oldVista = await this.findById(id);
        this.repository.merge(oldVista, change);
        const vistaMerged = await this.repository.save(oldVista);
        return vistaMerged;
    }

    async remove(id: number) {
        try {
            const vista = await this.findById(id);
            return this.repository.delete(id);
        } catch (error) {
            throw error;
        }
    }
}
