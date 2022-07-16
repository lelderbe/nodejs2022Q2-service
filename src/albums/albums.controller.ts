import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { validateUUIDv4 } from '../utils/validate';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

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
  @HttpCode(204)
  remove(@Param('id') id: string) {
    validateUUIDv4(id);
    return this.albumsService.remove(id);
  }
}
