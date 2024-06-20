import { Menu } from "../../menu/entities/menu.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'sistemas' })
export class Sistema {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', unique: true, nullable: false, })
    nombre: string;

    @Column({ type: 'text' })
    descripcion: string;

    @Column({ type: 'text' })
    url: string;

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

    @OneToMany(() => Menu, (menu) => menu.idSistema, { onDelete: "CASCADE" })
    menus: Menu[];

}