import { Module } from '@nestjs/common';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesEntity } from './cities.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CitiesEntity])],
  controllers: [CitiesController],
  providers: [CitiesService],
})
export class CitiesModule {}
