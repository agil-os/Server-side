import { Controller, Get, Req, Res } from '@nestjs/common';
import { hotelsData } from '../../sample_data/Booking/hotelsInfo.js';
import { LodgingService } from './lodging.service';
import { Request, Response } from 'express';

@Controller('lodging')
export class LodgingController {
  constructor(private lodgingService: LodgingService) { }

  @Get('/:city/:arrival/:departure')
  getHotels(@Req() req: Request, @Res() res: Response): Promise<any> {
    const { city, arrival, departure } = req.params;
    return this.lodgingService.getHotels(city, arrival, departure);
  }
}
