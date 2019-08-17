import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GasEntity } from './gas.entity';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { GasDto } from './gas.dto';

// create interface || class || DTO || graphql schema
// responsible for our business logic to be used in controller

@Injectable()
export class GasService {
    constructor(
        @InjectRepository(GasEntity)
        private gasRepository: Repository<GasEntity>,
    ) { }
    async  findAll(): Promise<GasEntity[]> {
        return await this.gasRepository.find({relations: ['cars']});
    }
    async read(id): Promise<GasEntity> {
        return await this.gasRepository.findOne({ where: { id } });
    }

    async  create(gasDto: GasDto): Promise<GasEntity> {
        // return await this.gasRepository.save(GasEntity);
        const {id, pricePerGal, cars} = gasDto;

        const gas = new GasEntity()
        gas.id = id;
        gas.pricePerGal = pricePerGal;
        gas.cars = cars;
        await gas.save();
        return gas;
    }

    async update(GasEntity: GasEntity): Promise<UpdateResult> {
        return await this.gasRepository.update(GasEntity.id, GasEntity);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.gasRepository.delete(id);
    }
}
