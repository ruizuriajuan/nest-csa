import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import config from './config';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(){
    //console.log( 'VARIBALES',process.env );
  }
}
