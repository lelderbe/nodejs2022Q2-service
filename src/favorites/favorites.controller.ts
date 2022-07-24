import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Errors } from '../app/constants';
import { CurrentUser } from '../users/decorators/user.decorator';
import { validateUUIDv4 } from '../utils/validate';
import { FavoritesService } from './favorites.service';
import { FavoritesRepsonse } from './types/favorites-response.interface';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @ApiOperation({
    summary: 'Get all favorites',
    description: 'Gets all favorites artists, albums and tracks',
  })
  @ApiOkResponse({ description: 'Successful operation' })
  @Get()
  async findAll(@CurrentUser('id') userId: string): Promise<FavoritesRepsonse> {
    const favorites = await this.favoritesService.findAll(userId);
    return this.favoritesService.buildFavoritesResponse(favorites);
  }

  @ApiOperation({
    summary: 'Add artist to the favorites',
    description: 'Add artist to the favorites',
  })
  @ApiCreatedResponse({ description: 'Added succesfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: "Artist with id doesn't exist.",
  })
  @Post('artist/:id')
  async addArtist(@Param('id') id: string, @CurrentUser('id') userId: string) {
    validateUUIDv4(id);
    await this.favoritesService.addArtist(id, userId);
    return {
      statusCode: HttpStatus.CREATED,
      message: Errors.ARTIST_ADDED_TO_FAVORITES,
    };
  }

  @ApiOperation({
    summary: 'Delete artist from favorites',
    description: 'Delete artist from favorites',
  })
  @ApiCreatedResponse({ description: 'Deleted succesfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Artist was not found.',
  })
  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    validateUUIDv4(id);
    return this.favoritesService.removeArtist(id, userId);
  }

  @ApiOperation({
    summary: 'Add album to the favorites',
    description: 'Add album to the favorites',
  })
  @ApiCreatedResponse({ description: 'Added succesfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: "Album with id doesn't exist.",
  })
  @Post('album/:id')
  async addAlbum(@Param('id') id: string, @CurrentUser('id') userId: string) {
    validateUUIDv4(id);
    await this.favoritesService.addAlbum(id, userId);
    return {
      statusCode: HttpStatus.CREATED,
      message: Errors.ALBUM_ADDED_TO_FAVORITES,
    };
  }

  @ApiOperation({
    summary: 'Delete album from favorites',
    description: 'Delete album from favorites',
  })
  @ApiCreatedResponse({ description: 'Deleted succesfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Album was not found.',
  })
  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    validateUUIDv4(id);
    return this.favoritesService.removeAlbum(id, userId);
  }

  @ApiOperation({
    summary: 'Add track to the favorites',
    description: 'Add track to the favorites',
  })
  @ApiCreatedResponse({ description: 'Added succesfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: "Track with id doesn't exist.",
  })
  @Post('track/:id')
  async addTrack(@Param('id') id: string, @CurrentUser('id') userId: string) {
    validateUUIDv4(id);
    await this.favoritesService.addTrack(id, userId);
    return {
      statusCode: HttpStatus.CREATED,
      message: Errors.TRACK_ADDED_TO_FAVORITES,
    };
  }

  @ApiOperation({
    summary: 'Delete track from favorites',
    description: 'Delete track from favorites',
  })
  @ApiCreatedResponse({ description: 'Deleted succesfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Track was not found.',
  })
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
