import { Controller, Get, Post, Body, Put, Param, Delete, Patch } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesEntity } from './categories.entity';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly CategoriesService: CategoriesService) { }

    @Get()
    async findAll(): Promise<CategoriesEntity[]> {
        return this.CategoriesService.findAll();
    }

    @Get(':id')
    async read(@Param('id') id): Promise<CategoriesEntity> {
        return this.CategoriesService.read(id);
    }

    @Post('create')
    async create(@Body() categoriesData: CategoriesEntity): Promise<any> {
        return this.CategoriesService.create(categoriesData);
    }

    @Put(':id/')
    async update(@Param('id') id, @Body() categoriesData: CategoriesEntity): Promise<any> {
        categoriesData.id = Number(id);
        console.log('Update #' + categoriesData.id)
        return this.CategoriesService.update(categoriesData);
    }

    @Delete(':id/')
    async delete(@Param('id') id): Promise<any> {
        return this.CategoriesService.delete(id);
    }


}
