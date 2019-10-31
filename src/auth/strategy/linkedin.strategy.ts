import { StrategyNames } from './index';
import { Strategy } from 'passport-linkedin-oauth2';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

const BASE_URL = `https://calm-waters-99106.herokuapp.com`;

@Injectable()
export class LinkedInStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: BASE_URL + '/auth/linkedin/callback',
      passReqToCallback: true,
    });
  }

  async validate(_, __, ___, profile, done: Function) {
    done(null, profile);
  }
}
