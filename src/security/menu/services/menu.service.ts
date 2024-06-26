import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { Menu } from '../entities/menu.entity';
import { MenuDto, MenuResponseDto, MenuUpdateDto } from '../dto/menu.dto';
import { SubMenuService } from 'src/security/sub-menu/services/submenu.service';



@Injectable()
export class MenuService {
    constructor(
        @InjectRepository(Menu)
        private repository: Repository<Menu>,
        private readonly submenuService: SubMenuService
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

    async findByIds(ids: number[]) {
        return await this.repository.findBy({ id: In(ids) });
    }

    async findSubMenus(id: number) {
        const menu = await this.repository.findOne({
            where: { id },
            relations: ['submenus']
        });
        if (!menu) {
            throw new NotFoundException(`No existe el menu: ${id}`)
        }
        return menu;
    }

    async create(data: MenuDto): Promise<MenuResponseDto> {
        try {
            const newMenu = await this.repository.create(data);
            const existe = await this.findByName(data.nombre);
            if (data.subMenuList) {
                const subMenuIds = await this.submenuService.findByIds(data.subMenuList);
                newMenu.submenus = subMenuIds;
            }
            await this.repository.save(newMenu);
            return plainToInstance(MenuResponseDto, newMenu);
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, menu: MenuUpdateDto) {
        const oldMenu = await this.findSubMenus(id);
        if(menu.subMenuList){
            let newSubMenus = menu.subMenuList;
            let oldSubmenus = oldMenu.submenus.map(sb => sb.id);
            let setSubMenuUnicos =  new Set(oldSubmenus);
            newSubMenus.forEach( id => setSubMenuUnicos.add(id));
            oldMenu.submenus = await this.submenuService.findByIds([...setSubMenuUnicos])
        }
        this.repository.merge(oldMenu, menu);
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

    async removeSubMenu(id: number, idsubMenu: number) {
        try {
            const menu = await this.findSubMenus(id);
            menu.submenus = menu.submenus.filter(
                (sb) => sb.id !== idsubMenu
            )
            return this.repository.save(menu)
        } catch (error) {
            throw error;
        }
    }
}
