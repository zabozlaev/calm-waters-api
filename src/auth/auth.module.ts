import { AuthMiddleware } from './middleware/auth.middleware';
import { AuthController } from './auth.controller';
import { LinkedInStrategy } from './strategy/linkedin.strategy';
import { AuthService } from './auth.service';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthRequiredGuard } from './guards/auth.guard';

@Module({
  imports: [UserModule],
  providers: [AuthService, LinkedInStrategy, AuthMiddleware, AuthRequiredGuard],
  controllers: [AuthController],
  exports: [AuthMiddleware, AuthService, AuthRequiredGuard],
})
export class AuthModule {}
