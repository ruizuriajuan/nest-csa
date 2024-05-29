import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type:'text', unique:true })
    email: string;

    @Column({type:'text' })
    name: string;

    @Column({type:'text'})
    password: string;

    @Column({type:'bool'})
    active: boolean;

    @Column()
    roles: string[];
}


