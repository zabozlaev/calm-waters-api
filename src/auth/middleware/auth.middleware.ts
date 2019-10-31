import { AuthService } from './../auth.service';
import { Request, Response } from 'express';
import {
  NestMiddleware,
  Injectable,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private logger = new Logger('AuthMiddleware');

  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: Function) {
    const token = req.cookies['x-token'];

    if (!token) {
      return next();
    }

    try {
      const user = await this.authService.verifyToken(token);
      req.user = user;
    } catch (error) {
      this.logger.log('AuthError');
      res.cookie('x-token', '', {
        expires: new Date(),
        httpOnly: true,
      });

      throw new HttpException(
        'Invalid token provided',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    next();
  }
}
