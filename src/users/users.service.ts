import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as uuid from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Errors } from '../app/constants';

@Injectable()
export class UsersService {
  private readonly users = [];

  create(input: CreateUserDto) {
    if (this.findOneByLogin(input.login)) {
      throw new ConflictException(Errors.LOGIN_ALREADY_EXISTS);
    }

    const ms = new Date().getTime();
    const user = Object.assign(new User(), {
      id: uuid.v4(),
      createdAt: ms,
      updatedAt: ms,
      version: 1,
      ...input,
    });
    this.users.push(user);

    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(Errors.USER_NOT_FOUND);
    }

    return user;
  }

  findOneByLogin(login: string) {
    return this.users.find((item) => item.login === login);
  }

  async update(id: string, input: UpdateUserDto) {
    const user = await this.findOne(id);
    if (user.password !== input.oldPassword) {
      throw new ForbiddenException(Errors.WRONG_PASSWORD);
    }
    user.password = input.newPassword;
    user.version = user.version + 1;
    user.updatedAt = new Date().getTime();

    return user;
  }

  remove(id: string) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index != -1) {
      const user = this.users.splice(index, 1)[0];
      return user;
    }

    throw new NotFoundException(Errors.USER_NOT_FOUND);
  }

  buildUserResponse(user: User) {
    const { password, ...rest } = user;
    return rest;
  }

  buildUsersResponse(users) {
    return users.map((user) => this.buildUserResponse(user));
  }
}
