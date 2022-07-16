import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly newPassword: string;
}
