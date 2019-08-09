import { Injectable } from '@nestjs/common';
import { UpdateResult, DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QualityEntity } from './quality.entity';

@Injectable()
export class QualityService {
    constructor(
        @InjectRepository(QualityEntity)
        private qualityRepository: Repository<QualityEntity>,
    ) { }
    async  findAll(): Promise<QualityEntity[]> {
        return await this.qualityRepository.find();
    }

    async  create(QualityEntity: QualityEntity): Promise<QualityEntity> {
        return await this.qualityRepository.save(QualityEntity);
    }

    async update(QualityEntity: QualityEntity): Promise<UpdateResult> {
        return await this.qualityRepository.update(QualityEntity.id, QualityEntity);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.qualityRepository.delete(id);
    }
}
