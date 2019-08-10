import { Module } from '@nestjs/common';
import { PricesController } from './prices.controller';
import { PricesService } from './prices.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PricesEntity } from './prices.entity';
import { TripsEntity } from '../trips/trips.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PricesEntity, TripsEntity])],
  controllers: [PricesController],
  providers: [PricesService],
})
export class PricesModule {}
