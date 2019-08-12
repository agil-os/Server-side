import { Controller, Get } from '@nestjs/common';
import { hotelsData } from '../../sample_data/Booking/hotelsInfo.js';

@Controller('lodging')
export class LodgingController {

  @Get()
  getSample() {
    // return hotelsData;
  }
}
