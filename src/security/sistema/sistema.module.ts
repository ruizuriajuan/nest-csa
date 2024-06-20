import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sistema } from './entities/sistema.entity';
import { SistemaController } from './controllers/sistema.controller';
import { SistemaService } from './services/sistema.service';

@Module({
    imports:[
        TypeOrmModule.forFeature([Sistema]),
      ],
      controllers: [SistemaController],
      providers: [SistemaService],
      exports: [SistemaService],
})
export class SistemaModule {}
