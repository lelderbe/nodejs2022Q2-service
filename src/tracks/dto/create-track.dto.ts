import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
  IsNumber,
} from 'class-validator';
import { UUID_VERSION } from '../../app/constants';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsUUID(UUID_VERSION)
  readonly artistId?: string;

  @IsOptional()
  @IsUUID(UUID_VERSION)
  readonly albumId?: string;

  @IsNumber()
  readonly duration: number;
}
