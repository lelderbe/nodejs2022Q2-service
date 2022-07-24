import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  forwardRef,
  Inject,
  HttpStatus,
} from '@nestjs/common';
import { CurrentUser } from '../users/decorators/user.decorator';
import { validateUUIDv4 } from '../utils/validate';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { FavoritesService } from '../favorites/favorites.service';
import { Artist } from './entities/artist.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Artists')
@Controller('artist')
export class ArtistsController {
  constructor(
    private readonly artistsService: ArtistsService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  @ApiOperation({ summary: 'Add new artist', description: 'Add new artist' })
  @ApiCreatedResponse({ description: 'Successful operation' })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  @Post()
  async create(@Body() input: CreateArtistDto): Promise<Artist> {
    return this.artistsService.create(input);
  }

  @ApiOperation({ summary: 'Get all artists', description: 'Gets all artists' })
  @ApiOkResponse({ description: 'Successful operation' })
  @Get()
  async findAll(): Promise<Artist[]> {
    return this.artistsService.findAll();
  }

  @ApiOperation({
    summary: 'Get single artist by id',
    description: 'Get single artist by id',
  })
  @ApiOkResponse({ description: 'Successful operation' })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist was not found.' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Artist> {
    validateUUIDv4(id);
    return this.artistsService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update artist information',
    description: 'Update artist information by UUID',
  })
  @ApiOkResponse({ description: 'The artist has been updated.' })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist was not found.' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() input: UpdateArtistDto,
  ): Promise<Artist> {
    validateUUIDv4(id);
    return this.artistsService.update(id, input);
  }

  @ApiOperation({
    summary: 'Delete artist',
    description: 'Delete artist from library',
  })
  @ApiNoContentResponse({ description: 'Delelted succesfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist was not found.' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @CurrentUser('id') userId: string) {
    validateUUIDv4(id);
    try {
      await this.favoritesService.removeArtist(id, userId);
    } catch {}
    await this.artistsService.remove(id);
  }
}
