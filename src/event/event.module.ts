import { Module, HttpModule } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvModule } from '../env.module';
import { EventEntity } from './event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity]), HttpModule, EnvModule],
  controllers: [EventController],
  providers: [EventService]
})
export class EventModule {}
