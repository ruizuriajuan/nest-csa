import { Menu } from "../../menu/entities/menu.entity";
import { Vista } from "../../vista/entities/vista.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({name:'submenus'})
export class SubMenu {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'text', unique:true, nullable: false, })
    nombre: string;

    @Column({type:'text' })
    sigla : string;
    
    @Column({type:'bool', default:true})
    activo: boolean;

    @Column({type:'text', name:'base_url' })
    baseUrl : string;

    @Column({type:'int' })
    orden : number;

    @CreateDateColumn({
        name:'fecha_creacion',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    fechaCreacion: Date;

    @UpdateDateColumn({
        name:'fecha_actualizacion',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    fechaActualizacion: Date;

    @ManyToOne(() => Menu, (menu) => menu.submenus)
    @JoinColumn({ name: "id_menu" })
    idMenu: Menu;

    @OneToMany(() => Vista, (vista) => vista.idSubMenu, { onDelete: "CASCADE" })
    vistas: Vista[];

}