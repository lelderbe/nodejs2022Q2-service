import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as uuid from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { Errors } from '../app/constants';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class ArtistsService {
  private readonly artists = [];

  constructor(
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
  ) {}

  async create(input: CreateArtistDto): Promise<Artist> {
    const artist = Object.assign(new Artist(), {
      id: uuid.v4(),
      ...input,
    });

    this.artists.push(artist);

    return artist;
  }

  async findAll(): Promise<Artist[]> {
    return this.artists;
  }

  async findOne(id: string): Promise<Artist> {
    const artist = this.artists.find((item) => item.id === id);

    if (!artist) {
      throw new NotFoundException(Errors.ARTIST_NOT_FOUND);
    }

    return artist;
  }

  async update(id: string, input: UpdateArtistDto): Promise<Artist> {
    return Object.assign(await this.findOne(id), input);
  }

  async remove(id: string): Promise<Artist> {
    const index = this.artists.findIndex((item) => item.id === id);

    if (index != -1) {
      await this.albumsService.removeArtist(id);
      await this.tracksService.removeArtist(id);

      return this.artists.splice(index, 1)[0];
    }

    throw new NotFoundException(Errors.ARTIST_NOT_FOUND);
  }
}
