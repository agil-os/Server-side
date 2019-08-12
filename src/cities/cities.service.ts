import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CitiesEntity } from './cities.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

// create interface || class || DTO || graphql schema
// responsible for our business logic to be used in controller

@Injectable()
export class CitiesService {
    constructor(
        @InjectRepository(CitiesEntity)
        private citiesRepository: Repository<CitiesEntity>,
    ) {}
    async  findAll(): Promise<CitiesEntity[]> {
        return await this.citiesRepository.find();
    }
    async  findOrigin(): Promise<CitiesEntity[]> {
        return await this.citiesRepository.find();
    }
    async  findDest(): Promise<CitiesEntity[]> {
        return await this.citiesRepository.find();
    }
    async read(id): Promise<CitiesEntity> {
        return await this.citiesRepository.findOne({ where: { id } });
    }

    async  create(CitiesEntity: CitiesEntity): Promise<CitiesEntity> {
        return await this.citiesRepository.save(CitiesEntity);
    }

    async update(CitiesEntity: CitiesEntity): Promise<UpdateResult> {
        return await this.citiesRepository.update(CitiesEntity.id, CitiesEntity);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.citiesRepository.delete(id);
    }
    
}
