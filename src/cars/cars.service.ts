import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarsEntity } from './cars.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { TripsEntity } from '../trips/trips.entity';
import { CarsDto } from './cars.dto';
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
    async  create(carsDto: CarsDto): Promise<CarsEntity> {
        // return await this.carsRepository.save(CarsEntity);
        const {id, isRental, tripDistance, trips, pricePerGal, total} = carsDto;
        const car = new CarsEntity();
        car.id = id;
        car.isRental = isRental;
        car.tripDistance = tripDistance;
        car.pricePerGal = pricePerGal;
        car.total = total;
        car.trips = trips;
        await car.save();
        return car;
    }

    async update(CarsEntity: CarsEntity): Promise<UpdateResult> {
        return await this.carsRepository.update(CarsEntity.id, CarsEntity);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.carsRepository.delete(id);
    }
}
