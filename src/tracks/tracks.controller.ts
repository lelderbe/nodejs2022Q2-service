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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Tracks')
@Controller('track')
export class TracksController {
  constructor(
    private readonly tracksService: TracksService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  @ApiOperation({ summary: 'Add new track', description: 'Add new track' })
  @ApiCreatedResponse({ description: 'Successful operation' })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  @Post()
  async create(@Body() input: CreateTrackDto): Promise<Track> {
    return this.tracksService.create(input);
  }

  @ApiOperation({ summary: 'Get all tracks', description: 'Gets all tracks' })
  @ApiOkResponse({ description: 'Successful operation' })
  @Get()
  async findAll(): Promise<Track[]> {
    return this.tracksService.findAll();
  }

  @ApiOperation({
    summary: 'Get single track by id',
    description: 'Get single track by id',
  })
  @ApiOkResponse({ description: 'Successful operation' })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track was not found.' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Track> {
    validateUUIDv4(id);
    return this.tracksService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update track information',
    description: 'Update track information by UUID',
  })
  @ApiOkResponse({ description: 'The track has been updated.' })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track was not found.' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() input: UpdateTrackDto,
  ): Promise<Track> {
    validateUUIDv4(id);
    return this.tracksService.update(id, input);
  }

  @ApiOperation({
    summary: 'Delete track',
    description: 'Delete track from library',
  })
  @ApiNoContentResponse({ description: 'Delelted succesfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track was not found.' })
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
