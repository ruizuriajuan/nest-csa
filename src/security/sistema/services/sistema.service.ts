import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { Sistema } from '../entities/sistema.entity';
import { SistemaDto, SistemaResponseDto, SistemaUpdateDto } from '../dto/sistema.dto';
import { MenuService } from 'src/security/menu/services/menu.service';


@Injectable()
export class SistemaService {
    constructor(
        @InjectRepository(Sistema)
        private repository: Repository<Sistema>,
        private readonly menuService: MenuService
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
            throw new NotFoundException(`No existe el sistema: ${id}`)
        }
        return sistema;
    }
    
    async findByIds(ids: number[]) {
        return await this.repository.findBy({ id: In(ids) });
    }

    async findMenus(id: number) {
        const sistema = await this.repository.findOne({
            where: { id },
            relations: ['menus']
        });
        if (!sistema) {
            throw new NotFoundException(`No existe el sistema: ${id}`)
        }
        return sistema;
    }


    async create(data: SistemaDto): Promise<SistemaResponseDto> {
        try {
            const newSistema = await this.repository.create(data);
            if (data.menuList) {
                newSistema.menus = await this.menuService.findByIds(data.menuList);
            }
            await this.repository.save(newSistema);
            return plainToInstance(SistemaResponseDto, newSistema);
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, sistema: SistemaUpdateDto) {
        const oldSistema = await this.findById(id);
        if (sistema.menuList) {
            let newMenus = sistema.menuList;
            let oldMenus = oldSistema.menus.map( m => m.id);
            let setMenusUnicos = new Set(oldMenus);
            newMenus.forEach(id => setMenusUnicos.add(id));
            oldSistema.menus = await this.menuService.findByIds([...setMenusUnicos]);
        }
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

    async removeMenu(id: number, idMenu: number) {
        try {
            const sistema = await this.findMenus(id);
            sistema.menus = sistema.menus.filter(
                (menu) => menu.id !== idMenu
            )
            return this.repository.save(sistema)
        } catch (error) {
            throw error;
        }
    }
}
