import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { MenuControler } from './controllers/menu.controller';
import { MenuService } from './services/menu.service';
import { SubMenuModule } from '../sub-menu/sub-menu.module';

@Module({
    imports:[
        TypeOrmModule.forFeature([Menu]),
        SubMenuModule
      ],
      controllers: [MenuControler],
      providers: [MenuService],
      exports: [MenuService],
})
export class MenuModule {}
