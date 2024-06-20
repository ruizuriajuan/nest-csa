import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { Menu } from '../entities/menu.entity';
import { MenuDto, MenuResponseDto } from '../dto/menu.dto';
import { MenuUpdateDto } from '../dto/menuupdate.dto';



@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(Menu)
        private repository: Repository<Menu>
    ) { }

    async findAll() {
        return await this.repository.find();
    }

    async findByName(nombre: string) {
        return await this.repository.findOne({ where: { nombre } });
    }

    async findById(id: number) {
        const menu = await this.repository.findOneBy({ id });
        if (!menu) {
            throw new NotFoundException(`No existe el Menu: ${id}`)
        }
        return menu;
    }

    async create(data: MenuDto): Promise<MenuResponseDto> {
        try {
            const existe = await this.findByName(data.nombre);
            if (existe) {
                throw new BadRequestException(`Menu duplicado: ${(existe).nombre}`);
            }
            const newMenu = await this.repository.create(data);
            await this.repository.save(newMenu);
            return plainToInstance(MenuResponseDto, newMenu);
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, Menu: MenuUpdateDto) {
        const oldMenu = await this.findById(id);
        this.repository.merge(oldMenu, Menu);
        const menuMerged = await this.repository.save(oldMenu);
        return menuMerged;
    }

    async remove(id: number) {
        try {
            const menu = await this.findById(id);
            return this.repository.delete(id);
        } catch (error) {
            throw error;
        }
    }
}
