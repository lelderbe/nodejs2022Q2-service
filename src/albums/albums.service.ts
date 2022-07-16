import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import * as uuid from 'uuid';
import { ArtistsService } from '../artists/artists.service';
import { Errors } from '../app/constants';

@Injectable()
export class AlbumsService {
  private readonly albums = [];

  // constructor(private readonly artistsService: ArtistsService) {}
  constructor(
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
  ) {}

  create(input: CreateAlbumDto) {
    // if (input.artistId) {
    //   this.artistsService.findOne(input.artistId);
    // }

    const album = Object.assign(new Album(), {
      id: uuid.v4(),
      ...input,
    });
    this.albums.push(album);

    return album;
  }

  findAll() {
    return this.albums;
  }

  findOne(id: string) {
    const album = this.albums.find((item) => item.id === id);
    if (!album) {
      throw new NotFoundException(Errors.ALBUM_NOT_FOUND);
    }

    return album;
  }

  async update(id: string, input: UpdateAlbumDto) {
    // if (input.artistId) {
    //   this.artistsService.findOne(input.artistId);
    // }

    return Object.assign(await this.findOne(id), input);
  }

  remove(id: string) {
    const index = this.albums.findIndex((item) => item.id === id);
    if (index != -1) {
      const album = this.albums.splice(index, 1)[0];
      return album;
    }

    throw new NotFoundException(Errors.ALBUM_NOT_FOUND);
  }
}
