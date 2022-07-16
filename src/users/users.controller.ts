import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { validateUUIDv4 } from '../utils/validate';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('user')
  create(@Body() input: CreateUserDto) {
    return this.usersService.create(input);
  }

  @Get('user')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('user/:id')
  findOne(@Param('id') id: string) {
    validateUUIDv4(id);
    return this.usersService.findOne(id);
  }

  @Put('user/:id')
  update(@Param('id') id: string, @Body() input: UpdateUserDto) {
    validateUUIDv4(id);
    return this.usersService.update(id, input);
  }

  @Delete('user/:id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    validateUUIDv4(id);
    return this.usersService.remove(id);
  }
}
