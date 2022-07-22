import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Errors, FAVORITE_TECH_ID } from '../app/constants';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';
import { Favorite } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
    private readonly tracksService: TracksService,
    @InjectRepository(Favorite)
    private readonly favoritesRepository: Repository<Favorite>,
  ) {}

  async findAll(userId: string) {
    return this.favoritesRepository.findOneBy({ id: FAVORITE_TECH_ID });
  }

  async addArtist(id: string, userId: string) {
    try {
      const artist = await this.artistsService.findOne(id);
      const favorites = await this.findAll(userId);

      if (!favorites.artists.find((item) => item === id)) {
        favorites.artists.push(artist.id);
        await this.favoritesRepository.save(favorites);
      }
    } catch {
      throw new UnprocessableEntityException(Errors.ARTIST_NOT_EXISTS);
    }
  }

  async removeArtist(id: string, userId: string) {
    const favorites = await this.findAll(userId);
    const index = favorites.artists.findIndex((item) => item === id);

    if (index === -1) {
      throw new NotFoundException(Errors.ARTIST_NOT_FOUND);
    }

    favorites.artists.splice(index, 1);
    await this.favoritesRepository.save(favorites);
  }

  async addAlbum(id: string, userId: string) {
    try {
      const album = await this.albumsService.findOne(id);
      const favorites = await this.findAll(userId);

      if (!favorites.albums.find((item) => item === id)) {
        favorites.albums.push(album.id);
        await this.favoritesRepository.save(favorites);
      }
    } catch {
      throw new UnprocessableEntityException(Errors.ALBUM_NOT_EXISTS);
    }
  }

  async removeAlbum(id: string, userId: string) {
    const favorites = await this.findAll(userId);
    const index = favorites.albums.findIndex((item) => item === id);

    if (index === -1) {
      throw new NotFoundException(Errors.ALBUM_NOT_FOUND);
    }

    favorites.albums.splice(index, 1);
    await this.favoritesRepository.save(favorites);
  }

  async addTrack(id: string, userId: string) {
    try {
      const track = await this.tracksService.findOne(id);
      const favorites = await this.findAll(userId);

      if (!favorites.tracks.find((item) => item === id)) {
        favorites.tracks.push(track.id);
        await this.favoritesRepository.save(favorites);
      }
    } catch {
      throw new UnprocessableEntityException(Errors.TRACK_NOT_EXISTS);
    }
  }

  async removeTrack(id: string, userId: string) {
    const favorites = await this.findAll(userId);
    const index = favorites.tracks.findIndex((item) => item === id);

    if (index === -1) {
      throw new NotFoundException(Errors.TRACK_NOT_FOUND);
    }

    favorites.tracks.splice(index, 1);
    await this.favoritesRepository.save(favorites);
  }

  async buildFavoritesResponse(favorites: Favorite) {
    const artists = await Promise.all(
      favorites.artists.map((id) => this.artistsService.findOne(id)),
    );
    const albums = await Promise.all(
      favorites.albums.map((id) => this.albumsService.findOne(id)),
    );
    const tracks = await Promise.all(
      favorites.tracks.map((id) => this.tracksService.findOne(id)),
    );
    return {
      artists,
      albums,
      tracks,
    };
  }
}
