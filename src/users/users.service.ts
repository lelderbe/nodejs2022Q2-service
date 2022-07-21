import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Errors } from '../app/constants';
import { UserResponse } from './types/user-response.type';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(input: CreateUserDto): Promise<User> {
    if (await this.findOneByLogin(input.login)) {
      throw new ConflictException(Errors.LOGIN_ALREADY_EXISTS);
    }

    const user = this.usersRepository.create(input);
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(Errors.USER_NOT_FOUND);
    }

    return user;
  }

  async findOneByLogin(login: string): Promise<User> {
    return this.usersRepository.findOneBy({ login });
  }

  async update(id: string, input: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (user.password !== input.oldPassword) {
      throw new ForbiddenException(Errors.WRONG_PASSWORD);
    }

    user.password = input.newPassword;
    user.version = user.version + 1;

    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<User> {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }

  async buildUserResponse(user: User): Promise<UserResponse> {
    const { password, ...rest } = user;
    return rest;
  }

  async buildUsersResponse(users: User[]): Promise<UserResponse[]> {
    return Promise.all(users.map((user) => this.buildUserResponse(user)));
  }
}
