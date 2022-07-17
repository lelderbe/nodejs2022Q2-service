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

@Controller('artist')
export class ArtistsController {
  constructor(
    private readonly artistsService: ArtistsService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  @Post()
  create(@Body() input: CreateArtistDto) {
    return this.artistsService.create(input);
  }

  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    validateUUIDv4(id);
    return this.artistsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() input: UpdateArtistDto) {
    validateUUIDv4(id);
    return this.artistsService.update(id, input);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @CurrentUser('id') userId: string) {
    validateUUIDv4(id);
    try {
      this.favoritesService.removeArtist(id, userId);
    } catch {}
    this.artistsService.remove(id);
  }
}
