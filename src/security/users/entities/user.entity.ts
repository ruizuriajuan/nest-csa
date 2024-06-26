import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Rol } from '../../roles/entities/rol.entity';


@Entity({ name: 'usuarios' })
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, type: 'text', unique: true })
    email: string;

    @Column({ type: 'text', nullable: true })
    nombre: string;

    @Exclude()
    @Column({ type: 'text' })
    password: string;

    @Column({ type: 'bool', default: true })
    activo: boolean;

    @Column({ name: 'cambiar_password', type: 'bool',  nullable: true })
    cambiarPassword: boolean;
   

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

    @ManyToMany(() => Rol, (rol) => rol.usuarios)
    @JoinTable({
        name: 'usuario_rol',
        joinColumn: {
            name: 'id_usuario'
        },
        inverseJoinColumn: {
            name: 'id_rol'
        }
    })
    roles: Rol[];

}


