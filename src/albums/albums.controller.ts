import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  forwardRef,
  Inject,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FavoritesService } from '../favorites/favorites.service';
import { CurrentUser } from '../users/decorators/user.decorator';
import { validateUUIDv4 } from '../utils/validate';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@ApiTags('Albums')
@Controller('album')
export class AlbumsController {
  constructor(
    private readonly albumsService: AlbumsService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  @ApiOperation({
    summary: 'Add new album',
    description: 'Add new album information',
  })
  @ApiCreatedResponse({ description: 'Album is created' })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  @Post()
  async create(@Body() input: CreateAlbumDto): Promise<Album> {
    return this.albumsService.create(input);
  }

  @ApiOperation({
    summary: 'Get albums list',
    description: 'Gets all library alibums list',
  })
  @ApiOkResponse({ description: 'Successful operation' })
  @Get()
  async findAll(): Promise<Album[]> {
    return this.albumsService.findAll();
  }

  @ApiOperation({
    summary: 'Get single album by id',
    description: 'Get single album by id',
  })
  @ApiOkResponse({ description: 'Successful operation' })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album was not found.' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Album> {
    validateUUIDv4(id);
    return this.albumsService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update album information',
    description: 'Update album information by UUID',
  })
  @ApiOkResponse({ description: 'The album has been updated.' })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album was not found.' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() input: UpdateAlbumDto,
  ): Promise<Album> {
    validateUUIDv4(id);
    return this.albumsService.update(id, input);
  }

  @ApiOperation({
    summary: 'Delete album',
    description: 'Delete album from library',
  })
  @ApiNoContentResponse({ description: 'Delelted succesfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album was not found.' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @CurrentUser('id') userId: string) {
    validateUUIDv4(id);
    try {
      await this.favoritesService.removeAlbum(id, userId);
    } catch {}
    await this.albumsService.remove(id);
  }
}
