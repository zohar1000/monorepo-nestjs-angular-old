import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { serverConfig } from '../../shared/consts/server-config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { EncryptionService } from '../../shared/services/encryption.service';
import { UserService } from '../../shared/services/entities/user.service';
import { User } from '@shared-all/models/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: serverConfig.auth.jwt.accessTokenSecretKey,
      signOptions: { expiresIn: serverConfig.auth.jwt.accessTokenExpiresIn }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtService, EncryptionService, UserService]
})
export class AuthModule {}
