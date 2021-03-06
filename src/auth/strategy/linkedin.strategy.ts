import { Strategy } from 'passport-linkedin-oauth2';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LinkedInStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: process.env.BASE_URL + '/auth/linkedin/callback',
      passReqToCallback: true,
    });
  }

  async validate(_, access_token, refresh_token, profile, done: Function) {
    done(null, {
      ...profile,
      access_token,
      refresh_token,
    });
  }
}
