import { Controller, Get, Post, Patch, Delete, Body, Put, Param } from '@nestjs/common';
import { GasService } from './gas.service';
import { GasEntity } from './gas.entity';

@Controller('gas')
export class GasController {
  constructor(private readonly GasService: GasService) { }

  @Get()
  async findAll(): Promise<GasEntity[]> {
    return this.GasService.findAll();
  }

  @Post('create')
  async create(@Body() gasData: GasEntity): Promise<any> {
    return this.GasService.create(gasData);
  }

  @Put(':id/update')
  async update(@Param('id') id, @Body() gasData: GasEntity): Promise<any> {
    gasData.id = Number(id);
    console.log('Update #' + gasData.id)
    return this.GasService.update(gasData);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.GasService.delete(id);
  }

  @Patch()
  updateGas(): string {
    return `This updates a Gas`;
  }
}
