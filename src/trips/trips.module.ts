import { Module } from '@nestjs/common';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripsEntity } from './trips.entity';
import { UsersEntity } from '../users/users.entity';
import { CitiesEntity } from '../cities/cities.entity';
import { PricesEntity } from '../prices/prices.entity';
import { QualityEntity } from '../quality/quality.entity';
import { CategoriesEntity } from '../categories/categories.entity';
import { CarsEntity } from '../cars/cars.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TripsEntity, UsersEntity, CitiesEntity, PricesEntity, QualityEntity, CategoriesEntity, CarsEntity])],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
