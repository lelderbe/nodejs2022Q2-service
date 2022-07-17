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

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll(@CurrentUser('id') userId: string) {
    const favorites = this.favoritesService.findAll(userId);
    return this.favoritesService.buildFavoritesResponse(favorites);
  }

  @Post('artist/:id')
  addArtist(@Param('id') id: string, @CurrentUser('id') userId: string) {
    validateUUIDv4(id);
    this.favoritesService.addArtist(id, userId);
    return {
      statusCode: HttpStatus.CREATED,
      message: Errors.ARTIST_ADDED_TO_FAVORITES,
    };
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id') id: string, @CurrentUser('id') userId: string) {
    validateUUIDv4(id);
    return this.favoritesService.removeArtist(id, userId);
  }

  @Post('album/:id')
  addAlbum(@Param('id') id: string, @CurrentUser('id') userId: string) {
    validateUUIDv4(id);
    this.favoritesService.addAlbum(id, userId);
    return {
      statusCode: HttpStatus.CREATED,
      message: Errors.ALBUM_ADDED_TO_FAVORITES,
    };
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id') id: string, @CurrentUser('id') userId: string) {
    validateUUIDv4(id);
    return this.favoritesService.removeAlbum(id, userId);
  }

  @Post('track/:id')
  addTrack(@Param('id') id: string, @CurrentUser('id') userId: string) {
    validateUUIDv4(id);
    this.favoritesService.addTrack(id, userId);
    return {
      statusCode: HttpStatus.CREATED,
      message: Errors.TRACK_ADDED_TO_FAVORITES,
    };
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id') id: string, @CurrentUser('id') userId: string) {
    validateUUIDv4(id);
    return this.favoritesService.removeTrack(id, userId);
  }
}
