import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { Sistema } from '../entities/sistema.entity';
import { SistemaDto, SistemaResponseDto, SistemaUpdateDto } from '../dto/sistema.dto';


@Injectable()
export class SistemaService {
    constructor(
        @InjectRepository(Sistema)
        private repository: Repository<Sistema>
    ) { }

    async findAll() {
        return await this.repository.find();
    }

    async findByName(nombre: string) {
        return await this.repository.findOne({ where: { nombre } });
    }

    async findById(id: number) {
        const sistema = await this.repository.findOneBy({ id });
        if (!sistema) {
            throw new NotFoundException(`No existe el Sistema: ${id}`)
        }
        return sistema;
    }

    async create(data: SistemaDto): Promise<SistemaResponseDto> {
        try {
            const existe = await this.findByName(data.nombre);
            if (existe) {
                throw new BadRequestException(`Sistema duplicado: ${(existe).nombre}`);
            }
            const newSistema = await this.repository.create(data);
            await this.repository.save(newSistema);
            return plainToInstance(SistemaResponseDto, newSistema);
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, sistema: SistemaUpdateDto) {
        const oldSistema = await this.findById(id);
        this.repository.merge(oldSistema, sistema);
        const sistemaMerged = await this.repository.save(oldSistema);
        return sistemaMerged;
    }

    async remove(id: number) {
        try {
            const sistema = await this.findById(id);
            return this.repository.delete(id);
        } catch (error) {
            throw error;
        }
    }
}
