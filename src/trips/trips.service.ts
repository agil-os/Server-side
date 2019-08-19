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
        return await this.tripsRepository.find({ relations: ['user', 'quality', 'lodging', 'transportation', 'price','cars']});
    }
    async  findTrip(): Promise<TripsEntity[]> {
        return await this.tripsRepository.find();
    }
    async read(id): Promise<TripsEntity> {
        return await this.tripsRepository.findOne({ where: { id }, relations: ['user', 'quality', 'lodging', 'transportation', 'price', 'cars'] });
    }

    async  create(tripsDto: TripsDto): Promise<TripsEntity> {
        // return await this.tripsRepository.save(TripsEntity);
        const {id, name, departureDate, arrivalDate, origin, destination, user, quality, lodging, transportation, pic, isRental, total
        } = tripsDto;

        const trip = new TripsEntity();
        trip.id = id;
        trip.name = name;
        trip.departureDate = departureDate;
        trip.arrivalDate = arrivalDate;
        trip.origin = origin;
        trip.destination = destination;
        trip.pic = pic;
        trip.isRental = isRental
        trip.total = total;
        trip.user = user;
        trip.quality = quality;
        trip.lodging = lodging;
        trip.transportation = transportation;
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
