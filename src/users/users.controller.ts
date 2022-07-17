import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { validateUUIDv4 } from '../utils/validate';
import { UserResponse } from './types/user-response.type';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() input: CreateUserDto): Promise<UserResponse> {
    const user = await this.usersService.create(input);
    return this.usersService.buildUserResponse(user);
  }

  @Get()
  async findAll(): Promise<UserResponse[]> {
    const users = await this.usersService.findAll();
    return this.usersService.buildUsersResponse(users);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponse> {
    validateUUIDv4(id);
    const user = await this.usersService.findOne(id);
    return this.usersService.buildUserResponse(user);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() input: UpdateUserDto,
  ): Promise<UserResponse> {
    validateUUIDv4(id);
    const user = await this.usersService.update(id, input);
    return this.usersService.buildUserResponse(user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    validateUUIDv4(id);
    await this.usersService.remove(id);
  }
}
