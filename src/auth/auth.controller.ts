import { UserEntity } from './../user/user.entity';
import { ApiUseTags, ApiOAuth2Auth, ApiOkResponse } from '@nestjs/swagger';
import { Profile } from './interfaces/profile';
import { AuthService } from './auth.service';
import { StrategyNames } from './strategy/index';
import {
  Controller,
  Get,
  UseGuards,
  Res,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { AuthRequiredGuard } from './guards/auth.guard';

@ApiUseTags('auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOAuth2Auth(['profile'])
  @HttpCode(HttpStatus.PERMANENT_REDIRECT)
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

    res.send(req.user);
  }

  @ApiOkResponse({
    type: UserEntity,
  })
  @UseGuards(AuthRequiredGuard)
  @Get('/me')
  async me(@Req() req) {
    return req.user || {};
  }
}
