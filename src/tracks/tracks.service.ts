import { Injectable, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { Errors } from '../app/constants';

@Injectable()
export class TracksService {
  private readonly tracks = [];

  async create(input: CreateTrackDto): Promise<Track> {
    const track = Object.assign(new Track(), {
      id: uuid.v4(),
      ...input,
    });

    this.tracks.push(track);

    return track;
  }

  async findAll(): Promise<Track[]> {
    return this.tracks;
  }

  async findOne(id: string): Promise<Track> {
    const track = this.tracks.find((item) => item.id === id);

    if (!track) {
      throw new NotFoundException(Errors.TRACK_NOT_FOUND);
    }

    return track;
  }

  async update(id: string, input: UpdateTrackDto): Promise<Track> {
    return Object.assign(await this.findOne(id), input);
  }

  async remove(id: string): Promise<Track> {
    const index = this.tracks.findIndex((item) => item.id === id);

    if (index != -1) {
      return this.tracks.splice(index, 1)[0];
    }

    throw new NotFoundException(Errors.TRACK_NOT_FOUND);
  }

  async removeArtist(id: string) {
    this.tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });
  }

  async removeAlbum(id: string) {
    this.tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });
  }
}
