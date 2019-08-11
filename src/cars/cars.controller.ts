import { Controller, Get, Post, Delete, Patch, Body, Put, Param } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsEntity } from './cars.entity';
import { rentalCarData } from '../../sample_data/Kajak/nolaRentalCar.js';
import { lasVegasData } from '../../sample_data/numbeo/lasVegas.js';

@Controller('cars')
export class CarsController {
  constructor(private readonly CarsService: CarsService) { }

    //gets all data from the cars table
  @Get()
  async findAll(): Promise<CarsEntity[]> {
    // console.log('plz', lasVegasData);
    return this.CarsService.findAll();
    // return rentalCarData; 
    // return lasVegasData; 
  }

    //gets specific cars from table based on id
  @Get(':id')
  async read(@Param('id') id): Promise<CarsEntity> {
    return this.CarsService.read(id);
  }

    //posts data into cars table
  @Post('create')
  async create(@Body() carsData: CarsEntity): Promise<any> {
    return this.CarsService.create(carsData);
  }

    //updates data based on cars id
  @Put(':id/')
  async update(@Param('id') id, @Body() carsData: CarsEntity): Promise<any> {
    carsData.id = Number(id);
    console.log('Update #' + carsData.id)
    return this.CarsService.update(carsData);
  }

    //deletes data based on cars id
  @Delete(':id/')
  async delete(@Param('id') id): Promise<any> {
    return this.CarsService.delete(id);
  }


}
