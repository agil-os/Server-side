import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import { GasService } from './gas.service';

@Controller('gas')
export class GasController {
  // constructor(private readonly GasService: GasService) {}

  @Get()
  getGas(): string {
    return `This gets the gas`;
  }

  @Post()
  createGas(): string {
    return `This creates gas`;
  }

  @Patch()
  updateGas(): string {
    return `This updates the gas`;
  }

  @Delete()
  deleteGas(): string {
    return `This deletes the gas`;
  }
}
