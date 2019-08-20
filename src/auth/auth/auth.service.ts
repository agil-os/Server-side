import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { EnvService } from '../../env.service';

export enum Provider {
  GOOGLE = 'google',
}
const config = new EnvService().read();

@Injectable()
export class AuthService {

  private readonly JWT_SECRET_KEY = config.JWT_SECRET_KEY;

  constructor(/*private readonly usersService: UsersService*/) { };

  
  async validateOAuthLogin(thirdPartyId: string, provider: Provider): Promise<string> {
    try {
      // You can add some registration logic here, 
      // to register the user using their thirdPartyId (in this case their googleId)
      // let user: IUser = await this.usersService.findOneByThirdPartyId(thirdPartyId, provider);

      // if (!user)
      // user = await this.usersService.registerOAuthUser(thirdPartyId, provider);
/*
      Sidenote: you should put some registration logic here, so you can store your users in a database.
      This is not in the scope of this post, so we will not handle it here.However, the comments might give you an idea on 
      how to implement such functionality.
      Our function accepts a thirdPartyId(i.e.Google userId) and a provider enum.By implementing the function this way, 
      it stays reusable and can thus be used for other social login providers like Github(simply repeat the same process as 
        for the GoogleStrategy but now use the Github specific passport strategy, Github credentials and Github endpoints)
*/
      const payload = {
        thirdPartyId,
        provider,
      };
      const jwt: string = sign(payload, this.JWT_SECRET_KEY, { expiresIn: 7200 });
      console.log('auth serivce jwt', jwt);
      return jwt;
    }
    catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }

}