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
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsInt()
  @IsPositive()
  year: number;

  @IsOptional()
  @IsUUID(UUID_VERSION)
  artistId?: string | null = null;
}
