import { join } from 'path';
export const FOLDER_DIST = join(process.cwd(), 'dist');
export const FOLDER_CLIENT = 'client';
import { Controller, Get, Res } from '@nestjs/common';

@Controller()
export class StaticController {

  @Get('*')
  serveStatic(@Res() res) {

    return res.sendFile(join((process.cwd(), 'dist'), 'index.html'));
  }
}