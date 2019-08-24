import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { TripsEntity } from '../trips/trips.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, TripsEntity]), HttpModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
