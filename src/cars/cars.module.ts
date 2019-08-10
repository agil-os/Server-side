import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsEntity } from './cars.entity';
import { GasEntity } from '../gas/gas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarsEntity, GasEntity])],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
