import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VistaController } from './controllers/rol.controller';
import { Vista } from './entities/vista.entity';
import { VistaService } from './services/vista.service';

@Module({
    imports:[
        TypeOrmModule.forFeature([Vista]),
      ],
      controllers: [VistaController],
      providers: [VistaService],
      exports: [VistaService],
})
export class VistaModule {}
