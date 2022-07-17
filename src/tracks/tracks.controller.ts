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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { validateUUIDv4 } from '../utils/validate';
import { FavoritesService } from '../favorites/favorites.service';
import { CurrentUser } from '../users/decorators/user.decorator';
import { Track } from './entities/track.entity';

@Controller('track')
export class TracksController {
  constructor(
    private readonly tracksService: TracksService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  @Post()
  async create(@Body() input: CreateTrackDto): Promise<Track> {
    return this.tracksService.create(input);
  }

  @Get()
  async findAll(): Promise<Track[]> {
    return this.tracksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Track> {
    validateUUIDv4(id);
    return this.tracksService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() input: UpdateTrackDto,
  ): Promise<Track> {
    validateUUIDv4(id);
    return this.tracksService.update(id, input);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @CurrentUser('id') userId: string) {
    validateUUIDv4(id);
    try {
      await this.favoritesService.removeTrack(id, userId);
    } catch {}
    await this.tracksService.remove(id);
  }
}
