import { Module } from '@nestjs/common';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesEntity } from './cities.entity';
import { TripsEntity } from '../trips/trips.entity';
import { UsersEntity } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CitiesEntity, TripsEntity, UsersEntity])],
  controllers: [CitiesController],
  providers: [CitiesService],
})
export class CitiesModule {}
