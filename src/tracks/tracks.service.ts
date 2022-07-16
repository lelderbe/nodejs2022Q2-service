import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ArtistsService } from '../artists/artists.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import * as uuid from 'uuid';
import { Track } from './entities/track.entity';
import { Errors } from '../app/constants';

@Injectable()
export class TracksService {
  private readonly tracks = [];

  constructor(
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
  ) {}

  create(input: CreateTrackDto) {
    const track = Object.assign(new Track(), {
      id: uuid.v4(),
      ...input,
    });
    this.tracks.push(track);

    return track;
  }

  findAll() {
    return this.tracks;
  }

  findOne(id: string) {
    const track = this.tracks.find((item) => item.id === id);
    if (!track) {
      throw new NotFoundException(Errors.TRACK_NOT_FOUND);
    }

    return track;
  }

  async update(id: string, input: UpdateTrackDto) {
    return Object.assign(await this.findOne(id), input);
  }

  remove(id: string) {
    const index = this.tracks.findIndex((item) => item.id === id);
    if (index != -1) {
      const track = this.tracks.splice(index, 1)[0];
      return track;
    }

    throw new NotFoundException(Errors.TRACK_NOT_FOUND);
  }

  removeArtist(id: string) {
    const tracks = this.findAll();
    tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });
  }

  removeAlbum(id: string) {
    const tracks = this.findAll();
    tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });
  }
}
