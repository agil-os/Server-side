import { Controller, Get, Post, Delete, Patch, Body, Put, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get()
  async findAll(): Promise<UsersEntity[]> {
    return this.UsersService.findAll();
  }

  @Post('create')
  async create(@Body() usersData: UsersEntity): Promise<any> {
    return this.UsersService.create(usersData);
  }

  @Put(':id/update')
  async update(@Param('id') id, @Body() usersData: UsersEntity): Promise<any> {
    usersData.id = Number(id);
    console.log('Update #' + usersData.id)
    return this.UsersService.update(usersData);
  }

  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.UsersService.delete(id);
  }

  @Patch()
  updateUser(): string {
    return `This updates a user`;
  }
}
