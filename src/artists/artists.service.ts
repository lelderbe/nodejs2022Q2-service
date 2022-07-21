import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { Errors } from '../app/constants';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
  ) {}

  async create(input: CreateArtistDto): Promise<Artist> {
    const artist = this.artistsRepository.create(input);
    return this.artistsRepository.save(artist);
  }

  async findAll(): Promise<Artist[]> {
    return this.artistsRepository.find();
  }

  async findOne(id: string): Promise<Artist> {
    const artist = await this.artistsRepository.findOneBy({ id });

    if (!artist) {
      throw new NotFoundException(Errors.ARTIST_NOT_FOUND);
    }

    return artist;
  }

  async update(id: string, input: UpdateArtistDto): Promise<Artist> {
    const artist = Object.assign(await this.findOne(id), input);
    return this.artistsRepository.save(artist);
  }

  async remove(id: string): Promise<Artist> {
    const artist = await this.findOne(id);
    return this.artistsRepository.remove(artist);
  }
}
