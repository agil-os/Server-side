import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarsEntity } from './cars.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { TripsEntity } from '../trips/trips.entity';
// create interface || class || DTO || graphql schema
// responsible for our business logic to be used in controller

@Injectable()
export class CarsService {
    constructor(
        @InjectRepository(CarsEntity)
        private carsRepository: Repository<CarsEntity>,
        // @InjectRepository(TripsEntity)
        // private tripsRepository: Repository<TripsEntity>,
    ) {}
    async  findAll(): Promise<CarsEntity[]> {
        return await this.carsRepository.find({relations: ['gas', 'trips']});
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
