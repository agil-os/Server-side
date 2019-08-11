import { Controller, Get, Post, Delete, Patch, Body, Put, Param } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesEntity } from './cities.entity';

@Controller('cities')
export class CitiesController {
  constructor(private readonly CitiesService: CitiesService) { }

    //gets all data from the cities table
  @Get()
  async findAll(): Promise<CitiesEntity[]> {
    return this.CitiesService.findAll();
  }
    //gets specific cities from table based on id
  @Get(':id')
  async read(@Param('id') id): Promise<CitiesEntity> {
    return this.CitiesService.read(id);
  }

    //posts data into cities table
  @Post('create')
  async create(@Body() citiesData: CitiesEntity): Promise<any> {
    return this.CitiesService.create(citiesData);
  }

    //updates data based on cities id
  @Put(':id/')
  async update(@Param('id') id, @Body() citiesData: CitiesEntity): Promise<any> {
    citiesData.id = Number(id);
    console.log('Update #' + citiesData.id)
    return this.CitiesService.update(citiesData);
  }

    //deletes data based on cities id
  @Delete(':id/')
  async delete(@Param('id') id): Promise<any> {
    return this.CitiesService.delete(id);
  }

}
