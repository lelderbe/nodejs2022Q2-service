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

@Controller('track')
export class TracksController {
  constructor(
    private readonly tracksService: TracksService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  @Post()
  create(@Body() input: CreateTrackDto) {
    return this.tracksService.create(input);
  }

  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    validateUUIDv4(id);
    return this.tracksService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() input: UpdateTrackDto) {
    validateUUIDv4(id);
    return this.tracksService.update(id, input);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @CurrentUser('id') userId: string) {
    validateUUIDv4(id);
    try {
      this.favoritesService.removeTrack(id, userId);
    } catch {}
    this.tracksService.remove(id);
  }
}
