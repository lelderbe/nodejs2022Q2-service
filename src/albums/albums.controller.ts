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
import { FavoritesService } from '../favorites/favorites.service';
import { CurrentUser } from '../users/decorators/user.decorator';
import { validateUUIDv4 } from '../utils/validate';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Controller('album')
export class AlbumsController {
  constructor(
    private readonly albumsService: AlbumsService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  @Post()
  async create(@Body() input: CreateAlbumDto): Promise<Album> {
    return this.albumsService.create(input);
  }

  @Get()
  async findAll(): Promise<Album[]> {
    return this.albumsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Album> {
    validateUUIDv4(id);
    return this.albumsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() input: UpdateAlbumDto,
  ): Promise<Album> {
    validateUUIDv4(id);
    return this.albumsService.update(id, input);
  }

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
