import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarsEntity } from './cars.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
// create interface || class || DTO || graphql schema
// responsible for our business logic to be used in controller

@Injectable()
export class CarsService {
    constructor(
        @InjectRepository(CarsEntity)
        private carsRepository: Repository<CarsEntity>,
    ) {}
    async  findAll(): Promise<CarsEntity[]> {
        return await this.carsRepository.find();
    }
    async read(id): Promise<CarsEntity> {
        return await this.carsRepository.findOne({ where: { id } });
    }
    async  create(CarsEntity: CarsEntity): Promise<CarsEntity> {
        return await this.carsRepository.save(CarsEntity);
    }

    async update(CarsEntity: CarsEntity): Promise<UpdateResult> {
        return await this.carsRepository.update(CarsEntity.id, CarsEntity);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.carsRepository.delete(id);
    }
}
