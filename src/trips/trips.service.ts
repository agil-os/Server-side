import { Injectable } from '@nestjs/common';
import { UpdateResult, DeleteResult, Repository, Timestamp } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TripsEntity } from './trips.entity';
import { UsersEntity } from '../users/users.entity';
import { TripsDto } from './trips.dto';
// create interface || class || DTO || graphql schema
// responsible for our business logic to be used in controller

@Injectable()
export class TripsService {
    constructor(
        @InjectRepository(TripsEntity)
        private tripsRepository: Repository<TripsEntity>,
        @InjectRepository(UsersEntity)
        private userRepository: Repository<UsersEntity>,
    ) { }
    async  findAll(): Promise<TripsEntity[]> {
        return await this.tripsRepository.find({ relations: ['user', 'quality', 'lodging', 'transportation']});
    }
    async  findTrip(): Promise<TripsEntity[]> {
        return await this.tripsRepository.find();
    }
    async read(id): Promise<TripsEntity> {
        return await this.tripsRepository.findOne({ where: { id } });
    }

    async  create(tripsDto: TripsDto): Promise<TripsEntity> {
        // return await this.tripsRepository.save(TripsEntity);
        const {id, name, departureDate, arrivalDate, origin, destination, userId, qualityId, lodgingId, transportationId } = tripsDto;

        const trip = new TripsEntity();
        trip.id = id;
        trip.name = name;
        trip.departureDate = departureDate;
        trip.arrivalDate = arrivalDate;
        trip.origin = origin;
        trip.destination = destination;
        trip.userId = userId;
        trip.qualityId = qualityId;
        trip.lodgingId = lodgingId;
        trip.transportationId = transportationId;
        await trip.save();

        return trip;
    }

    async update(TripsEntity: TripsEntity): Promise<UpdateResult> {
        return await this.tripsRepository.update(TripsEntity.id, TripsEntity);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.tripsRepository.delete(id);
    }
}
