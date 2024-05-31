import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, type:'text', unique:true })
    email: string;

    @Column({type:'text' })
    name: string;

    @Column({type:'text'})
    password: string;

    @Column({type:'bool'})
    active: boolean;

   
}


