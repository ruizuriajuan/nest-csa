import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { SubMenu } from '../entities/submenu.entity';
import { SubMenuDto, SubMenuResponseDto } from '../dto/submenu.dto';
import { SubMenuUpdateDto } from '../dto/submenuupdate.dto';
import { VistaService } from 'src/security/vista/services/vista.service';

@Injectable()
export class SubMenuService {
    constructor(
        @InjectRepository(SubMenu)
        private repository: Repository<SubMenu>,
        private readonly vistaService: VistaService
    ) { }

    async findAll() {
        return await this.repository.find();
    }

    async findById(id: number) {
        const subMenu = await this.repository.findOneBy({ id });
        if (!subMenu) {
            throw new NotFoundException(`No existe el SubMenu: ${id}`)
        }
        return subMenu;
    }

    async findByIds(ids: number[]) {
        return await this.repository.findBy({ id: In(ids) });
    }

    async findVistas(id: number) {
        const subMenu = await this.repository.findOne({
            where: { id },
            relations: ['vistas']
        });
        if (!subMenu) {
            throw new NotFoundException(`No existe el subMenu: ${id}`)
        }
        return subMenu;
    }

    async findByName(nombre: string) {
        return await this.repository.findOne({ where: { nombre } });
    }


    async create(data: SubMenuDto): Promise<SubMenuResponseDto> {
        try {
            const newSubMenu = await this.repository.create(data);
            if (data.vistaList) {
                const vistasIds = await this.vistaService.findByIds(data.vistaList);
                newSubMenu.vistas = vistasIds;
            }
            await this.repository.save(newSubMenu);
            return plainToInstance(SubMenuResponseDto, newSubMenu);
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, subMenu: SubMenuUpdateDto) {
        const oldSubMenu = await this.findVistas(id);
        if (subMenu.vistaList) {
            let newVistas = subMenu.vistaList;
            let oldVistas = oldSubMenu.vistas.map( v => v.id);
            let setVistasUnicas = new Set(oldVistas);
            newVistas.forEach(id => setVistasUnicas.add(id));
            oldSubMenu.vistas = await this.vistaService.findByIds([...setVistasUnicas]);
            //subMenu.vistaList = [];
        }
        await this.repository.merge(oldSubMenu, subMenu);
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

    async removeVista(id: number, idVista: number) {
        try {
            const subMenu = await this.findVistas(id);
            subMenu.vistas = subMenu.vistas.filter(
                (vista) => vista.id !== idVista
            )
            return this.repository.save(subMenu)
        } catch (error) {
            throw error;
        }
    }
}
