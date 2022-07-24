import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { Errors } from '../app/constants';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class AlbumsService {
  constructor(
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
  ) {}

  async create(input: CreateAlbumDto): Promise<Album> {
    const album = this.albumsRepository.create(input);
    return this.albumsRepository.save(album);
  }

  async findAll(): Promise<Album[]> {
    return this.albumsRepository.find();
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.albumsRepository.findOneBy({ id });

    if (!album) {
      throw new NotFoundException(Errors.ALBUM_NOT_FOUND);
    }

    return album;
  }

  async update(id: string, input: UpdateAlbumDto): Promise<Album> {
    const album = Object.assign(await this.findOne(id), input);
    return this.albumsRepository.save(album);
  }

  async remove(id: string): Promise<Album> {
    const album = await this.findOne(id);
    return this.albumsRepository.remove(album);
  }

  // async removeArtist(id: string) {
  //   this.albums.forEach((album) => {
  //     if (album.artistId === id) {
  //       album.artistId = null;
  //     }
  //   });
  // }
}
