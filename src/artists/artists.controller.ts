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

@Controller('artist')
export class ArtistsController {
  constructor(
    private readonly artistsService: ArtistsService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  @Post()
  async create(@Body() input: CreateArtistDto): Promise<Artist> {
    return this.artistsService.create(input);
  }

  @Get()
  async findAll(): Promise<Artist[]> {
    return this.artistsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Artist> {
    validateUUIDv4(id);
    return this.artistsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() input: UpdateArtistDto,
  ): Promise<Artist> {
    validateUUIDv4(id);
    return this.artistsService.update(id, input);
  }

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
