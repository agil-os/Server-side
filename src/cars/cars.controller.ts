import { Controller, Get, Post, Delete, Patch, Body, Put, Param } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsEntity } from './cars.entity';

@Controller('cars')
export class CarsController {
  constructor(private readonly CarsService: CarsService) { }

  @Get()
  async findAll(): Promise<CarsEntity[]> {
    return this.CarsService.findAll();
  }

  @Post('create')
  async create(@Body() carsData: CarsEntity): Promise<any> {
    return this.CarsService.create(carsData);
  }

  @Put(':id/update')
  async update(@Param('id') id, @Body() carsData: CarsEntity): Promise<any> {
    carsData.id = Number(id);
    console.log('Update #' + carsData.id)
    return this.CarsService.update(carsData);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.CarsService.delete(id);
  }

  @Patch()
  updateCar(): string {
    return `This updates a car`;
  }
}
