import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesEntity } from './categories.entity';
import { UpdateResult, DeleteResult } from 'typeorm';


@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(CategoriesEntity)
        private categoriesRepository: Repository<CategoriesEntity>,
    ) { }
    async  findAll(): Promise<CategoriesEntity[]> {
        return await this.categoriesRepository.find();
    }
    async read(id): Promise<CategoriesEntity> {
        return await this.categoriesRepository.findOne({ where: { id } });
    }

    async  create(CategoriesEntity: CategoriesEntity): Promise<CategoriesEntity> {
        return await this.categoriesRepository.save(CategoriesEntity);
    }

    async update(CategoriesEntity: CategoriesEntity): Promise<UpdateResult> {
        return await this.categoriesRepository.update(CategoriesEntity.id, CategoriesEntity);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.categoriesRepository.delete(id);
    }
}
