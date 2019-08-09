import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
<<<<<<< HEAD
import { CitiesEntity } from './cities.entity';
import { Repository } from 'typeorm';
=======
import { Repository } from 'typeorm';
import { CitiesEntity } from './cities.entity';
import { UpdateResult, DeleteResult } from 'typeorm';

>>>>>>> dc9e0013e92045061460d6e779de6961f6698e1e
// create interface || class || DTO || graphql schema
// responsible for our business logic to be used in controller

@Injectable()
export class CitiesService {
<<<<<<< HEAD
  constructor(
    @InjectRepository(CitiesEntity)
    private readonly cityRepository: Repository<CitiesEntity>,
  ) { }
// dont really need find all but example
  findAll(): Promise<CitiesEntity[]> {
    return this.cityRepository.find();
  }
=======
    constructor(
        @InjectRepository(CitiesEntity)
        private citiesRepository: Repository<CitiesEntity>,
    ) {}
    async  findAll(): Promise<CitiesEntity[]> {
        return await this.citiesRepository.find();
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
    
>>>>>>> dc9e0013e92045061460d6e779de6961f6698e1e
}
