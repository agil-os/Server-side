import { UsersEntity } from './users.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './users.createuser-dto';


@EntityRepository(UsersEntity)
export class UsersRepository extends Repository<UsersEntity> {
    async createUser(createUserDto: CreateUserDto): Promise<UsersEntity> {
        const { id, username, hometown, email } = createUserDto;

        const user = new UsersEntity();
        user.id = id;
        user.username = username;
        user.hometown = hometown;
        user.email = email;
        await user.save();

        return user;
    }
}