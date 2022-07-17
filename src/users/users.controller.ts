import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { validateUUIDv4 } from '../utils/validate';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() input: CreateUserDto) {
    const user = this.usersService.create(input);
    return this.usersService.buildUserResponse(user);
  }

  @Get()
  findAll() {
    const users = this.usersService.findAll();
    return this.usersService.buildUsersResponse(users);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    validateUUIDv4(id);
    const user = this.usersService.findOne(id);
    return this.usersService.buildUserResponse(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() input: UpdateUserDto) {
    validateUUIDv4(id);
    const user = await this.usersService.update(id, input);
    return this.usersService.buildUserResponse(user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    validateUUIDv4(id);
    this.usersService.remove(id);
  }
}
