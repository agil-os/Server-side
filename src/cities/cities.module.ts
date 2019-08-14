import { Module, HttpModule } from '@nestjs/common';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesEntity } from './cities.entity';
import { TripsEntity } from '../trips/trips.entity';
import { UsersEntity } from '../users/users.entity';
import { EnvModule } from '../env.module';

@Module({
  imports: [TypeOrmModule.forFeature([CitiesEntity, TripsEntity, UsersEntity]), HttpModule, EnvModule],
  controllers: [CitiesController],
  providers: [CitiesService],
})
export class CitiesModule {}
