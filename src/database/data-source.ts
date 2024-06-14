import * as dotenv from 'dotenv'
import { DataSource } from "typeorm";


export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.POSTGRES_URL,
    synchronize:false,
    logging:false,
    entities: [__dirname + '/../**/*.entity.js'],
    migrations: ['src/database/migrations/*.ts'] ,
    migrationsTableName:'migrations',
})