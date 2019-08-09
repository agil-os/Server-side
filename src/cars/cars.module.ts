import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsEntity } from './cars.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarsEntity])],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
