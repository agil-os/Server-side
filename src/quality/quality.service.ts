import { Injectable } from '@nestjs/common';
import { UpdateResult, DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QualityEntity } from './quality.entity';
import { QualityDto } from './quality.dto';
import { qualityData } from '../../sample_data/data/data.js'


@Injectable()
export class QualityService {
    constructor(
        @InjectRepository(QualityEntity)
        private qualityRepository: Repository<QualityEntity>,
    ) { }
    async  findAll(): Promise<QualityEntity[]> {
        return await this.qualityRepository.find();
    }
    async read(id): Promise<QualityEntity> {
        return await this.qualityRepository.findOne({ where: { id }});
    }

    async  create(qualityDto: QualityDto): Promise<QualityEntity> {
        // return await this.qualityRepository.save(qualityDto);
        let { id, level } = qualityDto;

            const quality = new QualityEntity();
            for (let i = 0; i < qualityData.length; i++){
            quality.id = id;
            quality.level = qualityData[i];
            await quality.save();
        }
        return quality;
        
    }

    async update(QualityEntity: QualityEntity): Promise<UpdateResult> {
        return await this.qualityRepository.update(QualityEntity.id, QualityEntity);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.qualityRepository.delete(id);
    }
}
