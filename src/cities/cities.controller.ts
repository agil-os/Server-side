import { Controller, Get, Post } from '@nestjs/common';
import { createConditionalTypeNode } from 'typescript';

@Controller('cities')
export class CitiesController {
  @Get()
  findAll(): string {
    return `This gets all the cities`;
  }

  @Post()
  createCity(): string {
    return `This posts a city`;
  }
}
