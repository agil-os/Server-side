import { Module, HttpModule } from '@nestjs/common';
import { LodgingService } from './lodging.service';
import { LodgingController } from './lodging.controller';
import { LodgingResolver } from './lodging.resolver';

@Module({
  imports: [HttpModule],
  providers: [LodgingService, LodgingResolver],
  controllers: [LodgingController],
})
export class LodgingModule {}
