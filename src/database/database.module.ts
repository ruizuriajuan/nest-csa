import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

@Global()
@Module({
    imports: [ ],
    providers: [
        {
            provide: DataSource, // add the datasource as a provider
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                try {
                    const { user, host, database, password, port } = configService.get('database').postgres;
                    const dataSource = new DataSource({
                        type: 'postgres',
                        host,
                        port,
                        username: user,
                        password,
                        database,
                        synchronize: false,
                        entities: [__dirname + '/../**/*.entity.js'] 
                    });
                    await dataSource.initialize(); // initialize the data source
                    console.log('Database connected successfully');
                    return dataSource;
                } catch (error) {
                    console.log('Error connecting to database');
                    throw error;
                }
            },
        },
    ],

    exports: [DataSource],
})
export class DatabaseModule { }



