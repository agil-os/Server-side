import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { TripsEntity } from '../trips/trips.entity';
import { UsersRepository } from './users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, TripsEntity, UsersRepository])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
