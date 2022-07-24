import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { UUID_VERSION } from '../../app/constants';

export class CreateAlbumDto {
  @ApiProperty({ example: 'Innuendo' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 1999 })
  @IsInt()
  @IsPositive()
  year: number;

  @ApiPropertyOptional({ format: 'uuid' })
  @IsOptional()
  @IsUUID(UUID_VERSION)
  artistId?: string | null;
}
