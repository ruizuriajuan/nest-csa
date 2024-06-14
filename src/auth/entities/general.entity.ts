import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class General {
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
}


