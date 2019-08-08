import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
import { UpdateResult, DeleteResult } from 'typeorm';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<UsersEntity>);
    findAll(): Promise<UsersEntity[]>;
    create(UsersEntity: UsersEntity): Promise<UsersEntity>;
    update(UsersEntity: UsersEntity): Promise<UpdateResult>;
    delete(id: any): Promise<DeleteResult>;
}
