import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { lastValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    return (await lastValueFrom(this.usersService.fetchUsers())).data;
  }
}
