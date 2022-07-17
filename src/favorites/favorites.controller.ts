import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
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
      statusCode: 201,
      message: 'Artist added to favorites',
    };
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id') id: string, @CurrentUser('id') userId: string) {
    validateUUIDv4(id);
    return this.favoritesService.removeArtist(id, userId);
  }

  @Post('album/:id')
  addAlbum(@Param('id') id: string, @CurrentUser('id') userId: string) {
    validateUUIDv4(id);
    this.favoritesService.addAlbum(id, userId);
    return {
      statusCode: 201,
      message: 'Album added to favorites',
    };
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id') id: string, @CurrentUser('id') userId: string) {
    validateUUIDv4(id);
    return this.favoritesService.removeAlbum(id, userId);
  }

  @Post('track/:id')
  addTrack(@Param('id') id: string, @CurrentUser('id') userId: string) {
    validateUUIDv4(id);
    this.favoritesService.addTrack(id, userId);
    return {
      statusCode: 201,
      message: 'Track added to favorites',
    };
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id') id: string, @CurrentUser('id') userId: string) {
    validateUUIDv4(id);
    return this.favoritesService.removeTrack(id, userId);
  }
}
