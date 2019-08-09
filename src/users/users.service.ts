import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { UpdateResult, DeleteResult } from 'typeorm';
// create interface || class || DTO || graphql schema
// responsible for our business logic to be used in controller
//database functions


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private usersRepository: Repository<UsersEntity>,
    ) {}
    async  findAll(): Promise<UsersEntity[]> {
        return await this.usersRepository.find();
    }

    async  create(UsersEntity: UsersEntity): Promise<UsersEntity> {
        return await this.usersRepository.save(UsersEntity);
    }

    async update(UsersEntity: UsersEntity): Promise<UpdateResult> {
        return await this.usersRepository.update(UsersEntity.id, UsersEntity);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.usersRepository.delete(id);
    }
}
