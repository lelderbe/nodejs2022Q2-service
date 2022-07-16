import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly login: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly password: string;
}
