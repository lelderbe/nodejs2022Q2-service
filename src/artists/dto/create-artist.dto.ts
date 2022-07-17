import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({ example: 'Freddie Mercury' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  readonly grammy: boolean;
}
