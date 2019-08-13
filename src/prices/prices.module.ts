import { Module, HttpModule } from '@nestjs/common';
import { PricesController } from './prices.controller';
import { PricesService } from './prices.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PricesEntity } from './prices.entity';
import { TripsEntity } from '../trips/trips.entity';
import { CategoriesEntity } from '../categories/categories.entity';
import { QualityEntity } from '../quality/quality.entity';
import { EnvModule } from '../env.module';

@Module({
  imports: [TypeOrmModule.forFeature([PricesEntity, TripsEntity, CategoriesEntity, QualityEntity]), HttpModule, EnvModule],
  controllers: [PricesController],
  providers: [PricesService],
})
export class PricesModule {}
