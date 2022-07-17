import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../users/decorators/user.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { validateUUIDv4 } from '../utils/validate';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  create(@Body() input: CreateArtistDto) {
    return this.artistsService.create(input);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@CurrentUser('id') userId: string) {
    console.log('user id:', userId);
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
  @HttpCode(204)
  remove(@Param('id') id: string) {
    validateUUIDv4(id);
    return this.artistsService.remove(id);
  }
}
