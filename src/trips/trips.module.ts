import { Module } from '@nestjs/common';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripsEntity } from './trips.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TripsEntity])],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
