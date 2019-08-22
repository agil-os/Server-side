import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { EnvModule } from '../env.module';
import { EnvService } from '../env.service';
import { AuthService, Provider } from './auth.service';

const config = new EnvService().read();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor(private readonly authService: AuthService) {
    super({
      clientID: config.CLIENT_ID,
      clientSecret: config.CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      passReqToCallback: true,
      scope: ['email', 'profile'],
    });
  }

  async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function) {
    try {
      console.log('full user', profile);
      console.log('user exact', profile._json);

      const jwt: string = await this.authService.validateOAuthLogin(profile.id, Provider.GOOGLE);
      const user = { jwt };
      console.log('web token', jwt);
      done(null, user);
    }
    catch (err) {
      // console.log(err)
      done(err, false);
    }
  }

}