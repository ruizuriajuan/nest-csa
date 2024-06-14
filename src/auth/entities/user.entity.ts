import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { General } from './general.entity';
import { Exclude } from 'class-transformer';

@Entity({name: 'usuarios'})
export class Usuario extends General{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, type:'text', unique:true })
    email: string;

    @Column({type:'text' })
    name: string;

    @Exclude()
    @Column({type:'text'})
    password: string;

    @Column({type:'bool'})
    activo: boolean;

   
}


