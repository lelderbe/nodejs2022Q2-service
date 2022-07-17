import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Errors } from '../app/constants';
import { CurrentUser } from '../users/decorators/user.decorator';
import { validateUUIDv4 } from '../utils/validate';
import { FavoritesService } from './favorites.service';
import { FavoritesRepsonse } from './types/favorites-response.interface';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findAll(@CurrentUser('id') userId: string): Promise<FavoritesRepsonse> {
    const favorites = await this.favoritesService.findAll(userId);
    return this.favoritesService.buildFavoritesResponse(favorites);
  }

  @Post('artist/:id')
  async addArtist(@Param('id') id: string, @CurrentUser('id') userId: string) {
    validateUUIDv4(id);
    await this.favoritesService.addArtist(id, userId);
    return {
      statusCode: HttpStatus.CREATED,
      message: Errors.ARTIST_ADDED_TO_FAVORITES,
    };
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    validateUUIDv4(id);
    return this.favoritesService.removeArtist(id, userId);
  }

  @Post('album/:id')
  async addAlbum(@Param('id') id: string, @CurrentUser('id') userId: string) {
    validateUUIDv4(id);
    await this.favoritesService.addAlbum(id, userId);
    return {
      statusCode: HttpStatus.CREATED,
      message: Errors.ALBUM_ADDED_TO_FAVORITES,
    };
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    validateUUIDv4(id);
    return this.favoritesService.removeAlbum(id, userId);
  }

  @Post('track/:id')
  async addTrack(@Param('id') id: string, @CurrentUser('id') userId: string) {
    validateUUIDv4(id);
    await this.favoritesService.addTrack(id, userId);
    return {
      statusCode: HttpStatus.CREATED,
      message: Errors.TRACK_ADDED_TO_FAVORITES,
    };
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    validateUUIDv4(id);
    return this.favoritesService.removeTrack(id, userId);
  }
}
