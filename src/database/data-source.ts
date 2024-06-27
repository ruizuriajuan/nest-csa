import * as dotenv from 'dotenv';
import { resolve } from "path";
import { DataSource, DataSourceOptions } from "typeorm";

dotenv.config();
//console.log('envvv',process.env.POSTGRES_URL);

export const dataSourcePostgres: DataSourceOptions = {
    type: 'postgres',
    url: process.env.POSTGRES_URL,
    synchronize: false,
    logging: false,
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/database/migrations/*.ts'],
    migrationsTableName: 'migrations',
    ssl: process.env.POSTGRES_SSL === 'true',
    extra: {
        ssl: process.env.POSTGRES_SSL === 'true' ? { rejectUnauthorized: false } : null
    }
}

const dataSource = new DataSource(dataSourcePostgres)
export default dataSource;

dataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })