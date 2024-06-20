import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { RolesModule } from './security/roles/roles.module';
import { UsersModule } from './security/users/users.module';
import { SistemaModule } from './security/sistema/sistema.module';
import { MenuModule } from './security/menu/menu.module';
import { SubMenuModule } from './security/sub-menu/sub-menu.module';
import { VistaModule } from './security/vista/vista.module';
import config from './config';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    RolesModule,
    SistemaModule,
    MenuModule,
    SubMenuModule,
    VistaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(){
    //console.log( 'VARIBALES',process.env );
  }
}
