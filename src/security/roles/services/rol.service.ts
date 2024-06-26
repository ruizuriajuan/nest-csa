import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from '../entities/rol.entity';
import { In, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { RolDto, RolResponseDto } from '../dto/rol.dto';
import { RolUpdateDto } from '../dto/rolupdate.dto';
import { VistaService } from 'src/security/vista/services/vista.service';

@Injectable()
export class RolService {
    constructor(
        @InjectRepository(Rol)
        private repository: Repository<Rol>,
        private readonly vistaService: VistaService
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

    async findByIds(ids: number[]) {
        return await this.repository.findBy({ id: In(ids) });
    }

    async findUsers(id: number) {
        const subMenu = await this.repository.findOne({
            where: { id },
            relations: ['usuarios']
        });
        if (!subMenu) {
            throw new NotFoundException(`No existe el rol: ${id}`)
        }
        return subMenu;
    }   
    
    async findVistas(id: number) {
        const subMenu = await this.repository.findOne({
            where: { id },
            relations: ['vistas']
        });
        if (!subMenu) {
            throw new NotFoundException(`No existe el rol: ${id}`)
        }
        return subMenu;
    }

    async create(data: RolDto): Promise<RolResponseDto> {
        try {
            const existe = await this.findByName(data.nombre);
            if (existe) {
                throw new BadRequestException(`Rol duplicado: ${(existe).nombre}`);
            }
            const newRol = await this.repository.create(data);
            if (data.vistaList) {
                newRol.vistas = await this.vistaService.findByIds(data.vistaList);
            }
            await this.repository.save(newRol);
            return plainToInstance(RolResponseDto, newRol);
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, updateRol: RolUpdateDto) {
        const oldRol = await this.findVistas(id);
        if (updateRol.vistaList) {
            let newVistas = updateRol.vistaList;
            let oldVistas = oldRol.vistas.map( v => v.id );
            let setVistasUnicas = new Set(oldVistas);
            newVistas.forEach(id => setVistasUnicas.add(id));
            oldRol.vistas = await this.vistaService.findByIds([...setVistasUnicas]);
        }
        this.repository.merge(oldRol, updateRol);
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

    async removeUser(id: number, idUser: number) {
        try {
            const rol = await this.findUsers(id);
            rol.usuarios = rol.usuarios.filter(
                (user) => user.id !== idUser
            )
            return this.repository.save(rol)
        } catch (error) {
            throw error;
        }
    }
}
