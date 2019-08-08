import { Controller, Get, Post, Delete, Patch, Body } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesEntity } from './cities.entity';

@Controller('cities')
export class CitiesController {
  constructor(private readonly CitiesService: CitiesService) {}

  @Get()
  findCity(): string {
    return `This gets all the cities`;
  }

  @Post('create')
    async create(@Body() citiesData: CitiesEntity): Promise < any > {
      return this.CitiesService.create(citiesData);
    }

  @Delete()
  deleteCity(): string {
    return `This deletes a city`;
  }

  @Patch()
  updateCity(): string {
    return `This updates a city`;
  }
}
