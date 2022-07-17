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
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsUUID(UUID_VERSION)
  readonly artistId?: string | null = null;

  @IsOptional()
  @IsUUID(UUID_VERSION)
  readonly albumId?: string | null = null;

  @IsNumber()
  @IsPositive()
  readonly duration: number;
}
