import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: "The user's login", example: 'TestUser' })
  @IsNotEmpty()
  @IsString()
  readonly login: string;

  @ApiProperty({ description: "The user's password" })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
