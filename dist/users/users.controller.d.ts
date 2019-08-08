import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
export declare class UsersController {
    private readonly UsersService;
    constructor(UsersService: UsersService);
    getUsers(): Promise<UsersEntity[]>;
    create(usersData: UsersEntity): Promise<any>;
    update(id: any, contactData: UsersEntity): Promise<any>;
    delete(id: any): Promise<any>;
    updateUser(): string;
}
