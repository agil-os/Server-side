import { Injectable } from '@nestjs/common';
import { UpdateResult, DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QualityEntity } from './quality.entity';
import { QualityDto } from './quality.dto';


@Injectable()
export class QualityService {
    constructor(
        @InjectRepository(QualityEntity)
        private qualityRepository: Repository<QualityEntity>,
    ) { }
    async  findAll(): Promise<QualityEntity[]> {
        return await this.qualityRepository.find({relations: ['trips', 'prices']});
    }
    async read(id): Promise<QualityEntity> {
        return await this.qualityRepository.findOne({ where: { id }, relations: ['trips', 'prices'] });
    }

    async  create(qualityDto: QualityDto): Promise<QualityEntity> {
        // return await this.qualityRepository.save(qualityDto);
        const { id, level } = qualityDto;
        
        const quality = new QualityEntity();
        quality.id = id;
        quality.level = level;
        await quality.save();

        return quality;
        
    }

    async update(QualityEntity: QualityEntity): Promise<UpdateResult> {
        return await this.qualityRepository.update(QualityEntity.id, QualityEntity);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.qualityRepository.delete(id);
    }
}
