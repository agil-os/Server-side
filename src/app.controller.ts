import { Controller, Get, Render, Res, Catch, NotFoundException, ExceptionFilter, HttpException  } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}

  // big boy requests
  @Get()
  root(@Res() res: Response) {
    res.sendFile('index.html', { root: __dirname + '../..agil-client/dist/browser'});
  }
  
  // @Get('*')
  // serveStatic(@Res() res) {

  //   return res.sendFile(join((process.cwd(), 'dist'), 'index.html'));
  // }
}
