import { Module } from '@nestjs/common';
import { GasController } from './gas.controller';
import { GasService } from './gas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GasEntity } from './gas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GasEntity])],
  controllers: [GasController],
  providers: [GasService],
})
export class GasModule {}
