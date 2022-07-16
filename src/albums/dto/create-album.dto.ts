import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { UUID_VERSION } from '../../app/constants';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  year?: number;

  @IsOptional()
  @IsUUID(UUID_VERSION)
  artistId?: string | null;
}
