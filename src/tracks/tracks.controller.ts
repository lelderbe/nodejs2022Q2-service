import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { validateUUIDv4 } from '../utils/validate';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

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
  @HttpCode(204)
  remove(@Param('id') id: string) {
    validateUUIDv4(id);
    return this.tracksService.remove(id);
  }
}
