import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubMenu } from './entities/submenu.entity';
import { SubMenuController } from './controllers/submenu.controller';
import { SubMenuService } from './services/submenu.service';

@Module({
    imports:[
        TypeOrmModule.forFeature([SubMenu]),
      ],
      controllers: [SubMenuController],
      providers: [SubMenuService],
      exports: [SubMenuService],
})
export class SubMenuModule {}
