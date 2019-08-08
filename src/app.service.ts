import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/ENVConfig/config.service';

@Injectable()
export class AppService {
  constructor(config: ConfigService) {

  }
  getHello(): string {
    return 'Hello World!';
  }
}
