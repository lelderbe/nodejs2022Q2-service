import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as uuid from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { Errors } from '../app/constants';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class AlbumsService {
  private readonly albums = [];

  constructor(
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
  ) {}

  async create(input: CreateAlbumDto): Promise<Album> {
    const album = Object.assign(new Album(), {
      id: uuid.v4(),
      ...input,
    });

    this.albums.push(album);

    return album;
  }

  async findAll(): Promise<Album[]> {
    return this.albums;
  }

  async findOne(id: string): Promise<Album> {
    const album = this.albums.find((item) => item.id === id);

    if (!album) {
      throw new NotFoundException(Errors.ALBUM_NOT_FOUND);
    }

    return album;
  }

  async update(id: string, input: UpdateAlbumDto): Promise<Album> {
    return Object.assign(await this.findOne(id), input);
  }

  async remove(id: string): Promise<Album> {
    const index = this.albums.findIndex((item) => item.id === id);

    if (index !== -1) {
      await this.tracksService.removeAlbum(id);

      return this.albums.splice(index, 1)[0];
    }

    throw new NotFoundException(Errors.ALBUM_NOT_FOUND);
  }

  async removeArtist(id: string) {
    this.albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });
  }
}
