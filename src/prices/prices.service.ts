import { Injectable } from '@nestjs/common';
import { UpdateResult, DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PricesEntity } from './prices.entity';

// create interface || class || DTO || graphql schema
// responsible for our business logic to be used in controller

@Injectable()
export class PricesService {
    constructor(
        @InjectRepository(PricesEntity)
        private pricesRepository: Repository<PricesEntity>,
    ) { }
    async  findAll(): Promise<PricesEntity[]> {
        return await this.pricesRepository.find();
    }
    async read(id): Promise<PricesEntity> {
        return await this.pricesRepository.findOne({where:{id}});
    }

    async  create(PricesEntity: PricesEntity): Promise<PricesEntity> {
        return await this.pricesRepository.save(PricesEntity);
    }

    async update(PricesEntity: PricesEntity): Promise<UpdateResult> {
        return await this.pricesRepository.update(PricesEntity.id, PricesEntity);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.pricesRepository.delete(id);
    }
}
