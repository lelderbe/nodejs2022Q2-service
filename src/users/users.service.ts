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
import { UserResponse } from './types/user-response.type';

@Injectable()
export class UsersService {
  private readonly users = [];

  async create(input: CreateUserDto): Promise<User> {
    if (await this.findOneByLogin(input.login)) {
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

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(id: string): Promise<User> {
    const user = this.users.find((item) => item.id === id);

    if (!user) {
      throw new NotFoundException(Errors.USER_NOT_FOUND);
    }

    return user;
  }

  async findOneByLogin(login: string): Promise<User> {
    return this.users.find((item) => item.login === login);
  }

  async update(id: string, input: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (user.password !== input.oldPassword) {
      throw new ForbiddenException(Errors.WRONG_PASSWORD);
    }

    user.password = input.newPassword;
    user.version = user.version + 1;
    user.updatedAt = new Date().getTime();

    return user;
  }

  async remove(id: string): Promise<User> {
    const index = this.users.findIndex((item) => item.id === id);

    if (index != -1) {
      const user = this.users.splice(index, 1)[0];

      return user;
    }

    throw new NotFoundException(Errors.USER_NOT_FOUND);
  }

  async buildUserResponse(user: User): Promise<UserResponse> {
    const { password, ...rest } = user;
    return rest;
  }

  async buildUsersResponse(users: User[]): Promise<UserResponse[]> {
    return Promise.all(users.map((user) => this.buildUserResponse(user)));
  }
}
