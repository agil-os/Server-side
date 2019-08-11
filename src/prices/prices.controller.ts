import { Controller, Get, Post, Delete, Patch, Body, Param, Put } from '@nestjs/common';
import { PricesService } from './prices.service';
import { PricesEntity } from './prices.entity';

@Controller('prices')
export class PricesController {
  constructor(private readonly PricesService: PricesService) { }

  @Get()
  async findAll(): Promise<PricesEntity[]> {
    return this.PricesService.findAll();
  }

  @Get(':id')
  async read(@Param('id') id): Promise<PricesEntity> {
    return this.PricesService.read(id);
  }

  @Post('create')
  async create(@Body() pricesData: PricesEntity): Promise<any> {
    return this.PricesService.create(pricesData);
  }

  @Put(':id/')
  async update(@Param('id') id, @Body() pricesData: PricesEntity): Promise<any> {
    pricesData.id = Number(id);
    console.log('Update #' + pricesData.id)
    return this.PricesService.update(pricesData);
  }

  @Delete(':id/')
  async delete(@Param('id') id): Promise<any> {
    return this.PricesService.delete(id);
  }

  @Patch()
  updatePrices(): string {
    return `This updates a Prices`;
  }
}
