import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  grammy?: boolean;
}
