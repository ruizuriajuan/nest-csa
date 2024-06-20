
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Usuario } from "../../users/entities/user.entity";
import { Vista } from "../../vista/entities/vista.entity";

@Entity({name:'roles'})
export class Rol {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'text', unique:true, nullable: false, })
    nombre: string;

    @Column({type:'text' })
    descripcion : string;
    
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

    @ManyToMany( ()=>Usuario, (user) => user.roles)
    usuarios: Usuario[];


    @ManyToMany( ()=>Vista, (vista) => vista.roles)
    @JoinTable({
        name:'permisos',
        joinColumn:{
            name:'id_rol'
        },
        inverseJoinColumn:{
            name: 'id_vista'
        }
    })
    vistas: Vista[];
}