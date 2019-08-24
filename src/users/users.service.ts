import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { UpdateResult, DeleteResult } from 'typeorm';
import { TripsEntity } from '../trips/trips.entity';
import { UserDto } from './users.dto';
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
        return await this.usersRepository.find({relations: ['trips']});
    }
    async read(id): Promise<UsersEntity> {
        return await this.usersRepository.findOne({ where: { id }, relations: ['trips'] });
    }

    async getUserById(id: number): Promise<UsersEntity> {
        const found = await this.usersRepository.findOne(id);

        if(!found) {
            throw new NotFoundException(`User with ID "${id}" not found!`);
        }

        return found;
    }

    async getUserByEmail(email: string): Promise<UsersEntity> {
        const found = await this.usersRepository.findOne({ where: {email}, relations: ['trips']});

        if(!found) {
            throw new NotFoundException(`User with email ${email} not found`);
        }

        return found;
    }

    async create(userDto: UserDto): Promise<UsersEntity> {
        // return await this.usersRepository.save(UsersEntity, TripsEntity);
        const { id, username, hometown, email, pic, password } = userDto;

        const user = new UsersEntity();
        user.id = id;
        user.username = username;
        user.hometown = hometown;
        user.email = email;
        user.pic = pic;
        user.password = password;
        await user.save();

        return user;
    }

    async update(UsersEntity: UsersEntity): Promise<UpdateResult> {
        return await this.usersRepository.update(UsersEntity.id, UsersEntity);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.usersRepository.delete(id);
    }


}
