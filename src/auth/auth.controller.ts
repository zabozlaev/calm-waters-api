import { Profile } from './interfaces/profile';
import { AuthService } from './auth.service';
import { StrategyNames } from './strategy/index';
import { Controller, Get, UseGuards, Res, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard(StrategyNames.LINKEDIN_STRATEGY))
  @Get('/linkedin')
  async linkedIn() {}

  @UseGuards(AuthGuard(StrategyNames.LINKEDIN_STRATEGY))
  @Get('/linkedin/callback')
  async linkedInCallback(@Res() res: Response, @Req() req: Request) {
    const token = await this.authService.login(req.user as Profile);

    res.cookie('x-token', token, {
      httpOnly: true,
    });

    return req.user;
  }

  @Get('/me')
  async me(@Req() req) {
    return req.user || {};
  }
}
