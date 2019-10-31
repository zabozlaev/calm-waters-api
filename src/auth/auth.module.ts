import { AuthMiddleware } from './middleware/auth.middleware';
import { AuthController } from './auth.controller';
import { LinkedInStrategy } from './strategy/linkedin.strategy';
import { AuthService } from './auth.service';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UserModule],
  providers: [AuthService, LinkedInStrategy, AuthMiddleware],
  controllers: [AuthController],
  exports: [AuthMiddleware, AuthService],
})
export class AuthModule {}
