import { Controller, Get, Post, Delete, Patch, Body, Put, Param } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesEntity } from './cities.entity';

@Controller('cities')
export class CitiesController {
  constructor(private readonly CitiesService: CitiesService) { }

  @Get()
  async findAll(): Promise<CitiesEntity[]> {
    return this.CitiesService.findAll();
  }

  @Post('create')
  async create(@Body() citiesData: CitiesEntity): Promise<any> {
    return this.CitiesService.create(citiesData);
  }

  @Put(':id/update')
  async update(@Param('id') id, @Body() citiesData: CitiesEntity): Promise<any> {
    citiesData.id = Number(id);
    console.log('Update #' + citiesData.id)
    return this.CitiesService.update(citiesData);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.CitiesService.delete(id);
  }

  @Patch()
  updateCities(): string {
    return `This updates a Cities`;
  }
}
