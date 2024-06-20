
import { Sistema } from "../../sistema/entities/sistema.entity";
import { SubMenu } from "../../sub-menu/entities/submenu.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({ name: 'menus' })
export class Menu {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', unique: true, nullable: false, })
    nombre: string;

    @Column({ type: 'text' })
    descripcion: string;

    @Column({ type: 'bool', default: true })
    activo: boolean;

    @CreateDateColumn({
        name: 'fecha_creacion',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    fechaCreacion: Date;

    @UpdateDateColumn({
        name: 'fecha_actualizacion',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    fechaActualizacion: Date;

    @ManyToOne(() => Sistema, (sistema) => sistema.menus)
    @JoinColumn({ name: "id_sistema" })
    idSistema: Sistema;

    @OneToMany(() => SubMenu, (submenu) => submenu.idMenu, { onDelete: "CASCADE" })
    submenus: SubMenu[];
}