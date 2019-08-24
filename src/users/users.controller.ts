import { Controller, Get, Post, Delete, Patch, Body, Put, Param, HttpService } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { UserDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService, private readonly http: HttpService) {}

  //gets all data from the user table
  @Get()
  async findAll(): Promise<UsersEntity[]> {
    return this.UsersService.findAll();
  }

  //gets specific user from table based on id
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<UsersEntity> {
    return this.UsersService.getUserById(id);
  }

  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<UsersEntity> {
    return this.UsersService.getUserByEmail(email);
  }
  @Get('password/:email/:password')
  async password(@Param('email') email: string, @Param('password') password: string): Promise<UsersEntity> {
    const response = await this.http.get('http://localhost:3000/users/').toPromise()
    return response.data.filter(user => user.email === email && user.password === password);
  }

  //posts data into user table
  @Post('create')
  async create(@Body() usersData: UserDto): Promise<any> {
    return this.UsersService.create(usersData);
  }

  // @Post()
  // createUser(@Body() createUserDto: CreateUserDto): Promise<UsersEntity> {
  //   return this.UsersService.createUser(createUserDto);
  // }


  //updates data based on user id
  @Put(':id/')
  async update(@Param('id') id, @Body() usersData: UsersEntity): Promise<any> {
    usersData.id = Number(id);
    console.log('Update #' + usersData.id)
    return this.UsersService.update(usersData);
  }

  //deletes data based on user id
  @Delete(':id/')
  async delete(@Param('id') id): Promise<any> {
    return this.UsersService.delete(id);
  }

}
