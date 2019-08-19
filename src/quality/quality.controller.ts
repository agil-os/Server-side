import { Controller, Get, Post, Body, Put, Param, Delete, Patch } from '@nestjs/common';
import { QualityService } from './quality.service';
import { QualityEntity } from './quality.entity';
import { QualityDto } from './quality.dto';

@Controller('quality')
export class QualityController {
    constructor(private readonly QualityService: QualityService) {}

      //gets all data from the quality table
    @Get()
    async findAll(): Promise<QualityEntity[]> {
        return this.QualityService.findAll();
    }
      //gets specific quality from table based on id
    @Get(':id')
    async read(@Param('id') id): Promise<QualityEntity> {
        return this.QualityService.read(id);
    }

      //posts data into quality table
    @Post('create')
    async create(@Body() qualityData: QualityDto): Promise<any> {
        return this.QualityService.create(qualityData);
    }

      //updates data based on quality id
    @Put(':id/update')
    async update(@Param('id') id, @Body() qualityData: QualityEntity): Promise<any> {
        qualityData.id = Number(id);
        console.log('Update #' + qualityData.id)
        return this.QualityService.update(qualityData);
    }

      //deletes data based on quality id
    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
        return this.QualityService.delete(id);
    }
}
