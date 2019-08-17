import { Controller, Get, Post, Delete, Patch, Body, Put, Param } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsEntity } from './trips.entity';
import { rentalCarData } from '../../sample_data/Kajak/nolaRentalCar.js';
import { TripsDto } from './trips.dto';


@Controller('trips')
export class TripsController {
  constructor(private readonly TripsService: TripsService) { }

    //gets all data from the trips table
  @Get()
  async findAll(): Promise<TripsEntity[]> {
    return this.TripsService.findAll();
  }
  @Get('detail')
  async findTrip(): Promise<TripsEntity[]> {
    let name = 'Las Vegas Trip'
    let arrivalDate = rentalCarData.queryinfo.pickupdate
    let departureDate = rentalCarData.queryinfo.dropoffdate
    return [name, arrivalDate, departureDate];
  }
    //gets specific trips from table based on id
  @Get(':id')
  async read(@Param('id') id): Promise<TripsEntity> {
    return this.TripsService.read(id);
  }

    //posts data into trips table
  @Post('create')
  async create(@Body() tripsData: TripsDto): Promise<any> {
    return this.TripsService.create(tripsData);
  }

    //updates data based on trips id
  @Put(':id/')
  async update(@Param('id') id, @Body() tripsData: TripsEntity): Promise<any> {
    tripsData.id = Number(id);
    console.log('Update #' + tripsData.id)
    return this.TripsService.update(tripsData);
  }

    //deletes data based on trips id
  @Delete(':id/')
  async delete(@Param('id') id): Promise<any> {
    return this.TripsService.delete(id);
  }


}
