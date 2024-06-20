import { Module } from '@nestjs/common';
import { RolController } from './controllers/rol.controller';
import { RolService } from './services/rol.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Rol]),
  ],
  controllers: [RolController],
  providers: [RolService],
  exports: [RolService],
})
export class RolesModule {}
