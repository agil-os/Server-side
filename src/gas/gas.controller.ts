import { Controller, Get, Post, Patch, Delete, Body, Put, Param } from '@nestjs/common';
import { GasService } from './gas.service';
import { GasEntity } from './gas.entity';

@Controller('gas')
export class GasController {
  constructor(private readonly GasService: GasService) { }

    //gets all data from the gas table
  @Get()
  async findAll(): Promise<GasEntity[]> {
    return this.GasService.findAll();
  }

    //gets specific gas from table based on id
  @Get(':id')
  async read(@Param('id') id): Promise<GasEntity> {
    return this.GasService.read(id);
  }

    //posts data into gas table
  @Post('create')
  async create(@Body() gasData: GasEntity): Promise<any> {
    return this.GasService.create(gasData);
  }

    //updates data based on gas id
  @Put(':id/')
  async update(@Param('id') id, @Body() gasData: GasEntity): Promise<any> {
    gasData.id = Number(id);
    console.log('Update #' + gasData.id)
    return this.GasService.update(gasData);
  }
  //deletes data based on gas id
  @Delete(':id/')
  async delete(@Param('id') id): Promise<any> {
    return this.GasService.delete(id);
  }

}
