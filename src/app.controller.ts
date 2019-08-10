import { Controller, Get, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}

  // big boy requests
  @Get()
  root(@Res() res: Response) {
    res.sendFile('index.html', { root: __dirname + '../..agil-client/dist/browser'});
  }
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  
}
