import { Module } from '@nestjs/common';
import { LodgingService } from './lodging.service';
import { LodgingController } from './lodging.controller';
import { LodgingResolver } from './lodging.resolver';

@Module({
  providers: [LodgingService, LodgingResolver],
  controllers: [LodgingController],
})
export class LodgingModule {}
