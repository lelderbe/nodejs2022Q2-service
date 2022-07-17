import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Errors } from '../app/constants';
import { UsersService } from '../users/users.service';
import { SignupUserDto } from './dto/signup-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(input: SignupUserDto) {
    const users = await this.usersService.findAll();
    const user = users.find((user) => user.login === input.login);

    if (!user || user.password !== input.password) {
      throw new ForbiddenException(Errors.INCORRECT_CREDENTIALS);
    }

    const payload = { sub: user.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async signup(input: SignupUserDto) {
    if (await this.usersService.findOneByLogin(input.login)) {
      throw new ConflictException(Errors.LOGIN_ALREADY_EXISTS);
    }

    await this.usersService.create(input);
  }
}
