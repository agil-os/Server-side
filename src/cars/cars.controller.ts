import { Controller, Get, Post, Delete, Patch } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly CarsService: CarsService) {}

  @Get()
  getCars(): string {
    return `This returns the cars`;
  }

  @Post()
  createCars(): string {
    return `This creates a car`;
  }

  @Delete()
  deleteCar(): string {
    return `This deletes a car`;
  }

  @Patch()
  updateCar(): string {
    return `This updates a car`;
  }
}
