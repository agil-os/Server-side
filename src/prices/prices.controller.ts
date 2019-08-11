import { Controller, Get, Post, Delete, Patch, Body, Param, Put } from '@nestjs/common';
import { PricesService } from './prices.service';
import { PricesEntity } from './prices.entity';

@Controller('prices')
export class PricesController {
  constructor(private readonly PricesService: PricesService) { }

    //gets all data from the prices table
  @Get()
  async findAll(): Promise<PricesEntity[]> {
    return this.PricesService.findAll();
  }

    //gets specific prices from table based on id
  @Get(':id')
  async read(@Param('id') id): Promise<PricesEntity> {
    return this.PricesService.read(id);
  }

  //posts data into prices table
  @Post('create')
  async create(@Body() pricesData: PricesEntity): Promise<any> {
    return this.PricesService.create(pricesData);
  }

    //updates data based on prices id
  @Put(':id/')
  async update(@Param('id') id, @Body() pricesData: PricesEntity): Promise<any> {
    pricesData.id = Number(id);
    console.log('Update #' + pricesData.id)
    return this.PricesService.update(pricesData);
  }

    //deletes data based on prices id
  @Delete(':id/')
  async delete(@Param('id') id): Promise<any> {
    return this.PricesService.delete(id);
  }

}
