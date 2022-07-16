import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as uuid from 'uuid';
import { Errors } from '../app/constants';

@Injectable()
export class UsersService {
  private readonly users = [];

  create(input: CreateUserDto) {
    const ms = new Date().getTime();
    const user = Object.assign(new User(), {
      id: uuid.v4(),
      createdAt: ms,
      updatedAt: ms,
      version: 1,
      ...input,
    });
    // console.log('user:', user);
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
}
