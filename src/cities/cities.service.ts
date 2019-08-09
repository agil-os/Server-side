import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CitiesEntity } from './cities.entity';
import { Repository } from 'typeorm';
// create interface || class || DTO || graphql schema
// responsible for our business logic to be used in controller

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(CitiesEntity)
    private readonly cityRepository: Repository<CitiesEntity>,
  ) { }
// dont really need find all but example
  findAll(): Promise<CitiesEntity[]> {
    return this.cityRepository.find();
  }
}
