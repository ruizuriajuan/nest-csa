import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { SubMenu } from '../entities/submenu.entity';
import { SubMenuDto, SubMenuResponseDto } from '../dto/submenu.dto';
import { SubMenuUpdateDto } from '../dto/submenuupdate.dto';

@Injectable()
export class SubMenuService {
    constructor(
        @InjectRepository(SubMenu)
        private repository: Repository<SubMenu>
    ) { }

    async findAll() {
        return await this.repository.find();
    }

    async findByName(nombre: string) {
        return await this.repository.findOne({ where: { nombre } });
    }

    async findById(id: number) {
        const subMenu = await this.repository.findOneBy({ id });
        if (!subMenu) {
            throw new NotFoundException(`No existe el SubMenu: ${id}`)
        }
        return subMenu;
    }

    async create(data: SubMenuDto): Promise<SubMenuResponseDto> {
        try {
            const existe = await this.findByName(data.nombre);
            if (existe) {
                throw new BadRequestException(`SubMenu duplicado: ${existe.nombre}`);
            }
            const newSubMenu = await this.repository.create(data);
            await this.repository.save(newSubMenu);
            return plainToInstance(SubMenuResponseDto, newSubMenu);
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, subMenu: SubMenuUpdateDto) {
        const oldSubMenu = await this.findById(id);
        this.repository.merge(oldSubMenu, subMenu);
        const subMenuMerged = await this.repository.save(oldSubMenu);
        return subMenuMerged;
    }

    async remove(id: number) {
        try {
            const subMenu = await this.findById(id);
            return this.repository.delete(id);
        } catch (error) {
            throw error;
        }
    }
}
