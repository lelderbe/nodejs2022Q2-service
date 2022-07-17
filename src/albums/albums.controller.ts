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

@Controller('album')
export class AlbumsController {
  constructor(
    private readonly albumsService: AlbumsService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  @Post()
  create(@Body() input: CreateAlbumDto) {
    return this.albumsService.create(input);
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    validateUUIDv4(id);
    return this.albumsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() input: UpdateAlbumDto) {
    validateUUIDv4(id);
    return this.albumsService.update(id, input);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @CurrentUser('id') userId: string) {
    validateUUIDv4(id);
    try {
      this.favoritesService.removeAlbum(id, userId);
    } catch {}
    this.albumsService.remove(id);
  }
}
