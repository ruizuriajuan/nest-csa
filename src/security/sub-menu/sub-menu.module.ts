import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubMenu } from './entities/submenu.entity';
import { SubMenuController } from './controllers/submenu.controller';
import { SubMenuService } from './services/submenu.service';
import { Vista } from '../vista/entities/vista.entity';
import { VistaService } from '../vista/services/vista.service';
import { VistaModule } from '../vista/vista.module';

@Module({
    imports:[
        TypeOrmModule.forFeature([SubMenu,Vista]),
        VistaModule
      ],
      controllers: [SubMenuController],
      providers: [SubMenuService],
      exports: [SubMenuService],
})
export class SubMenuModule {}
