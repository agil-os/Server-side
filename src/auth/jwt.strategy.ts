import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvService } from '../env.service';

const config = new EnvService().read();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt')
{

  constructor(/*private readonly authService: AuthService*/) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.JWT_SECRET_KEY,
    });
  }

  async validate(payload, done: Function) {
    try {
      // You could add a function to the authService to verify the claims of the token:
      // i.e. does the user still have the roles that are claimed by the token
      //const validClaims = await this.authService.verifyTokenClaims(payload);

      //if (!validClaims)
      //    return done(new UnauthorizedException('invalid token claims'), false);

      /*
      Sidenote: we could also implement some logic to validate the claims of our JWT token here.
      For example, the token could contain a property describing the roles of a user.
      It would be necessary to check whether the user still has the roles the JWT claims to have.However, this is outside the scope of this post.
      The comments provide an idea on how this could be implemented.
      */
     console.log('payload', payload);
      done(null, payload);
    }
    catch (err) {
      throw new UnauthorizedException('unauthorized', err.message);
    }
  }

}