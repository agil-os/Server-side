import { Controller, Get, Post, Delete, Patch, Body, Put, Param } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsEntity } from './trips.entity';

@Controller('trips')
export class TripsController {
  constructor(private readonly TripsService: TripsService) { }

  @Get()
  async findAll(): Promise<TripsEntity[]> {
    return this.TripsService.findAll();
  }

  @Post('create')
  async create(@Body() tripsData: TripsEntity): Promise<any> {
    return this.TripsService.create(tripsData);
  }

  @Put(':id/')
  async update(@Param('id') id, @Body() tripsData: TripsEntity): Promise<any> {
    tripsData.id = Number(id);
    console.log('Update #' + tripsData.id)
    return this.TripsService.update(tripsData);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.TripsService.delete(id);
  }

  @Patch()
  updateTrips(): string {
    return `This updates a Trips`;
  }

}
