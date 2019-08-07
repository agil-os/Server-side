import { Controller, Get, Post, Delete, Patch } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  // constructor(private readonly UsersService: UsersService) {}

  @Get()
  getUsers(): string {
    return `This gets the users`;
  }

  @Post()
  createUser(): string {
    return `This creates a user`;
  }

  @Delete()
  deleteUser(): string {
    return `This deletes a user`;
  }

  @Patch()
  updateUser(): string {
    return `This updates a user`;
  }
}
