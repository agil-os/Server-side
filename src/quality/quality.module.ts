import { Module } from '@nestjs/common';
import { QualityService } from './quality.service';
import { QualityController } from './quality.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QualityEntity } from './quality.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QualityEntity])],
  providers: [QualityService],
  controllers: [QualityController]
})
export class QualityModule {}
