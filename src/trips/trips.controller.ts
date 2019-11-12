import { Controller, Get, Post, Delete, Patch, Body, Put, Param, HttpService } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsEntity } from './trips.entity';
import { rentalCarData } from '../../sample_data/Kajak/nolaRentalCar.js';
import { TripsDto } from './trips.dto';
import { getManager } from 'typeorm';
import { UsersEntity } from '../users/users.entity';
import { EnvService } from '../env.service';

const config = new EnvService().read()
@Controller('trips')
export class TripsController {
  constructor(private readonly TripsService: TripsService, private readonly http: HttpService) { }

    //gets all data from the trips table
  @Get()
  async findAll(): Promise<TripsEntity[]> {
    return this.TripsService.findAll();
  }
  @Get('event/:country/:city/:startDate/:endDate')
  async findEvents(@Param('country') country: string, @Param('city') city: string, @Param('startDate') startDate: string, @Param('endDate') endDate: string) {
    const response = await this.http.get(`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${country}&city=${city}&startDateTime=${startDate}T14:00:00Z&endDateTime=${endDate}T14:00:00Z&apikey=${config.TM_api_key}`).toPromise()
    return response.data._embedded.events.map(name => name.name)
  }

  @Get(':email')
  async findTrips(@Param('email') email: string) {
    const response = await this.http.get('http://3.85.122.97:3000/trips/').toPromise()
    return response.data.filter(user => user.user.email === email);
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
