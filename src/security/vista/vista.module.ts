import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vista } from './entities/vista.entity';
import { VistaService } from './services/vista.service';
import { VistaController } from './controllers/vista.controller';


@Module({
    imports:[
        TypeOrmModule.forFeature([Vista]),
      ],
      controllers: [VistaController],
      providers: [VistaService],
      exports: [VistaService],
})
export class VistaModule {}
