import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UsersModule } from 'src/security/users/users.module';



@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SEED,
      signOptions: { expiresIn: '6h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
