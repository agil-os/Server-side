import { Controller, Get, Post, Delete, Patch, Body, Put, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  //gets all data from the user table
  @Get()
  async findAll(): Promise<UsersEntity[]> {
    return this.UsersService.findAll();
  }

  //gets specific user from table based on id
  @Get(':id')
  async read(@Param('id') id): Promise<UsersEntity> {
    return this.UsersService.read(id);
  }

  //posts data into user table
  @Post('create')
  async create(@Body() usersData: UsersEntity): Promise<any> {
    return this.UsersService.create(usersData);
  }

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
