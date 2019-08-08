import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CitiesEntity } from './cities.entity';
// create interface || class || DTO || graphql schema
// responsible for our business logic to be used in controller

@Injectable()
export class CitiesService {
    constructor(
        @InjectRepository(CitiesEntity)
        private citiesRepository: Repository<CitiesEntity>,
    ) {}
    async create(CitiesEntity: CitiesEntity): Promise<CitiesEntity> {
        return await this.citiesRepository.save(CitiesEntity);
    }
    
}
