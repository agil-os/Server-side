import { Controller, Get, Post, Body, Put, Param, Delete, Patch } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesEntity } from './categories.entity';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly CategoriesService: CategoriesService) { }

      //gets all data from the categories table
    @Get()
    async findAll(): Promise<CategoriesEntity[]> {
        return this.CategoriesService.findAll();
    }

      //gets specific categories from table based on id
    @Get(':id')
    async read(@Param('id') id): Promise<CategoriesEntity> {
        return this.CategoriesService.read(id);
    }

      //posts data into categories table
    @Post('create')
    async create(@Body() categoriesData: CategoriesEntity): Promise<any> {
        return this.CategoriesService.create(categoriesData);
    }

      //updates data based on categories id
    @Put(':id/')
    async update(@Param('id') id, @Body() categoriesData: CategoriesEntity): Promise<any> {
        categoriesData.id = Number(id);
        console.log('Update #' + categoriesData.id)
        return this.CategoriesService.update(categoriesData);
    }

      //deletes data based on categories id
    @Delete(':id/')
    async delete(@Param('id') id): Promise<any> {
        return this.CategoriesService.delete(id);
    }


}
