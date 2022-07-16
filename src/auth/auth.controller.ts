import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() input: LoginUserDto) {
    return this.authService.login(input);
  }

  @Post('signup')
  @HttpCode(204)
  signup(@Body() input: SignupUserDto) {
    return this.authService.signup(input);
  }
}
