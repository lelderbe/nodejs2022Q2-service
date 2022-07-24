import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { UUID_VERSION } from '../../app/constants';

export class CreateTrackDto {
  @ApiProperty({ example: 'The Show Must Go On' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiPropertyOptional({ format: 'uuid' })
  @IsOptional()
  @IsUUID(UUID_VERSION)
  readonly artistId?: string | null;

  @ApiPropertyOptional({ format: 'uuid' })
  @IsOptional()
  @IsUUID(UUID_VERSION)
  readonly albumId?: string | null;

  @ApiProperty({ description: 'In seconds', example: 262 })
  @IsNumber()
  @IsPositive()
  readonly duration: number;
}
