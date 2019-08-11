import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GasEntity } from './gas.entity';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';

// create interface || class || DTO || graphql schema
// responsible for our business logic to be used in controller

@Injectable()
export class GasService {
    constructor(
        @InjectRepository(GasEntity)
        private gasRepository: Repository<GasEntity>,
    ) { }
    async  findAll(): Promise<GasEntity[]> {
        return await this.gasRepository.find();
    }
    async read(id): Promise<GasEntity> {
        return await this.gasRepository.findOne({ where: { id } });
    }

    async  create(GasEntity: GasEntity): Promise<GasEntity> {
        return await this.gasRepository.save(GasEntity);
    }

    async update(GasEntity: GasEntity): Promise<UpdateResult> {
        return await this.gasRepository.update(GasEntity.id, GasEntity);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.gasRepository.delete(id);
    }
}
