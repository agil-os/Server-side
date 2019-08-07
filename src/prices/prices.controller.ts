import { Controller, Get, Post, Delete, Patch } from '@nestjs/common';
import { PricesService } from './prices.service';

@Controller('prices')
export class PricesController {
  constructor(private readonly PricesService: PricesService) {}

  @Get()
  getPrices(): string {
    return `This gets all the prices`;
  }

  @Post()
  createPrices(): string {
    return `This posts all the prices`;
  }

  @Delete()
  deletePrices(): string {
    return `This deletes all the prices`;
  }

  @Patch()
  updatePrices(): string {
    return `This updates all the prices`;
  }

}
