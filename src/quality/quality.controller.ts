import { Controller, Get, Post, Body, Put, Param, Delete, Patch } from '@nestjs/common';
import { QualityService } from './quality.service';
import { QualityEntity } from './quality.entity';

@Controller('quality')
export class QualityController {
    constructor(private readonly QualityService: QualityService) {}

    @Get()
    async findAll(): Promise<QualityEntity[]> {
        return this.QualityService.findAll();
    }

    @Post('create')
    async create(@Body() qualityData: QualityEntity): Promise<any> {
        return this.QualityService.create(qualityData);
    }

    @Put(':id/update')
    async update(@Param('id') id, @Body() qualityData: QualityEntity): Promise<any> {
        qualityData.id = Number(id);
        console.log('Update #' + qualityData.id)
        return this.QualityService.update(qualityData);
    }

    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
        return this.QualityService.delete(id);
    }

    @Patch()
    updateQuality(): string {
        return `This updates a Quality`;
    }
}
