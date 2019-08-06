import { Controller, Get, Post, Delete, Patch } from '@nestjs/common';

@Controller('cities')
export class CitiesController {
  @Get()
  findCity(): string {
    return `This gets all the cities`;
  }

  @Post()
  createCity(): string {
    return `This posts a city`;
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
