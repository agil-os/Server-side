import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth/auth.service';
import { GoogleStrategy } from './google.strategy';
import { EnvModule } from '../env.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [EnvModule],
  providers: [AuthService, GoogleStrategy, JwtStrategy],
})
export class AuthModule {}
