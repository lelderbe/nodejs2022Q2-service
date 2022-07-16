import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import * as uuid from 'uuid';
import { Errors } from '../app/constants';

@Injectable()
export class ArtistsService {
  private readonly artists = [];

  create(input: CreateArtistDto) {
    const artist = Object.assign(new Artist(), {
      id: uuid.v4(),
      ...input,
    });
    this.artists.push(artist);

    return artist;
  }

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    const artist = this.artists.find((item) => item.id === id);
    if (!artist) {
      throw new NotFoundException(Errors.ARTIST_NOT_FOUND);
    }

    return artist;
  }

  async update(id: string, input: UpdateArtistDto) {
    return Object.assign(await this.findOne(id), input);
  }

  remove(id: string) {
    const index = this.artists.findIndex((item) => item.id === id);
    if (index != -1) {
      const artist = this.artists.splice(index, 1)[0];
      return artist;
    }

    throw new NotFoundException(Errors.ARTIST_NOT_FOUND);
  }
}
