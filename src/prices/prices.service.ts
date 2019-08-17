import { Injectable } from '@nestjs/common';
import { UpdateResult, DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PricesEntity } from './prices.entity';
import { PricesDto } from './prices.dto';

// create interface || class || DTO || graphql schema
// responsible for our business logic to be used in controller

@Injectable()
export class PricesService {
    constructor(
        @InjectRepository(PricesEntity)
        private pricesRepository: Repository<PricesEntity>,
    ) { }
    async  findAll(): Promise<PricesEntity[]> {
        return await this.pricesRepository.find({relations: ['trips', 'quality', 'category']});
    }
    async findFood(): Promise<PricesEntity[]> {
        return await this.pricesRepository.find();
    }
    async findFlight(): Promise<PricesEntity[]> {
        return await this.pricesRepository.find();
    }
    async findHotel(): Promise<PricesEntity[]> {
        return await this.pricesRepository.find();
    }
    async read(id): Promise<PricesEntity> {
        return await this.pricesRepository.findOne({where:{id}});
    }

    async  create(pricesDto: PricesDto): Promise<PricesEntity> {
        // return await this.pricesRepository.save(PricesEntity);
        const {id, low, average, high, trips, quality, category} = pricesDto
        
        const price = new PricesEntity();
        price.id = id;
        price.low = low;
        price.average = average;
        price.high = high;
        price.trips = trips;
        price.quality = quality;
        price.category = category;
        await price.save()
        return price;
    }

    async update(PricesEntity: PricesEntity): Promise<UpdateResult> {
        return await this.pricesRepository.update(PricesEntity.id, PricesEntity);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.pricesRepository.delete(id);
    }
}
