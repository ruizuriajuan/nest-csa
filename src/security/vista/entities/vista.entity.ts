
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SubMenu } from "../../sub-menu/entities/submenu.entity";
import { Rol } from "../../roles/entities/rol.entity";

@Entity({name:'vistas'})
export class Vista {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'text', unique:true, nullable: false, })
    nombre: string;

    @Column({type:'text' })
    pagina : string;
   
    @Column({type:'int' })
    orden : number;

    @Column({type:'bool', default:true})
    activo: boolean;

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

    @ManyToOne(() => SubMenu, (submenu) => submenu.vistas)
    @JoinColumn({ name: "id_submenu" })
    idSubMenu: SubMenu;

    @ManyToMany( ()=>Rol, (rol) => rol.vistas)
    roles: Rol[];


}