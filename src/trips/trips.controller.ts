import { Controller, Get, Post, Delete, Patch } from '@nestjs/common';
import { TripsService } from './trips.service';

@Controller('trips')
export class TripsController {
  // constructor(private readonly TripsService: TripsService) {}

  @Get()
  findTrip(): string {
    return `This gets all the trips`;
  }

  @Post()
  createTrip(): string {
    return `This creates the trips`;
  }

  @Delete()
  deleteTrip(): string {
    return `This deletes all the trips`;
  }

  @Patch()
  updateATrip(): string {
    return `This updates all the trips`;
  }

}
