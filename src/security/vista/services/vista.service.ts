import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { Vista } from '../entities/vista.entity';
import { VistaUpdateDto } from '../dto/vistaupdate.dto';
import { VistaDto, VistaResponseDto } from '../dto/vista.dto';

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
            throw new NotFoundException(`No existe el Vista: ${id}`)
        }
        return vista;
    }

    async create(data: VistaDto): Promise<VistaResponseDto> {
        try {
            const existe = await this.findByName(data.nombre);
            if (existe) {
                throw new BadRequestException(`Vista duplicada: ${(existe).nombre}`);
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
