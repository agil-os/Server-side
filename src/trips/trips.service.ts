import { Injectable } from '@nestjs/common';
import { UpdateResult, DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TripsEntity } from './trips.entity';
// create interface || class || DTO || graphql schema
// responsible for our business logic to be used in controller

@Injectable()
export class TripsService {
    constructor(
        @InjectRepository(TripsEntity)
        private tripsRepository: Repository<TripsEntity>,
    ) { }
    async  findAll(): Promise<TripsEntity[]> {
        return await this.tripsRepository.find();
    }

    async  create(TripsEntity: TripsEntity): Promise<TripsEntity> {
        return await this.tripsRepository.save(TripsEntity);
    }

    async update(TripsEntity: TripsEntity): Promise<UpdateResult> {
        return await this.tripsRepository.update(TripsEntity.id, TripsEntity);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.tripsRepository.delete(id);
    }
}
