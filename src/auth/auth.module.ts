import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { UserRepository } from './user.repository';
import { AuthService } from './auth.service';
import { JwtStrategy } from './auth-jwt-strategy';
import * as config from 'config';
import { AuthGoogleStrategy } from './auth-google-strategy';
const dbconfig = config.get('jwt');

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: dbconfig.secret,
      signOptions: {
        expiresIn: dbconfig.expiresIn,
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthGoogleStrategy],
  exports: [JwtStrategy, PassportModule, AuthGoogleStrategy],
})
export class AuthModule {}
