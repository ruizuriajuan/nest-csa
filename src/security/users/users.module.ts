import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/user.entity';
import { UserService } from './services/user.service';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Usuario]),
    RolesModule
  ],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
