import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: "The user's old password" })
  @IsNotEmpty()
  @IsString()
  readonly oldPassword: string;

  @ApiProperty({ description: "The user's new password" })
  @IsNotEmpty()
  @IsString()
  readonly newPassword: string;
}
