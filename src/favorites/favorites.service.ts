import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Errors } from '../app/constants';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';

@Injectable()
export class FavoritesService {
  private readonly artists = [];
  private readonly albums = [];
  private readonly tracks = [];

  constructor(
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
  ) {}

  async findAll(userId: string) {
    return {
      artists: this.artists
        .filter((item) => item.userId === userId)
        .map((item) => item.id),
      albums: this.albums
        .filter((item) => item.userId === userId)
        .map((item) => item.id),
      tracks: this.tracks
        .filter((item) => item.userId === userId)
        .map((item) => item.id),
    };
  }

  async addArtist(id: string, userId: string) {
    try {
      await this.artistsService.findOne(id);
    } catch {
      throw new UnprocessableEntityException(Errors.ARTIST_NOT_EXISTS);
    }

    const index = this.artists.findIndex(
      (item) => item.userId === userId && item.id === id,
    );

    if (index === -1) {
      this.artists.push({ userId, id });
    }
    // TODO: else - error?
  }

  async removeArtist(id: string, userId: string) {
    const index = this.artists.findIndex(
      (item) => item.userId === userId && item.id === id,
    );

    if (index === -1) {
      throw new NotFoundException(Errors.ARTIST_NOT_FOUND);
    }

    this.artists.splice(index, 1);
  }

  async addAlbum(id: string, userId: string) {
    try {
      await this.albumsService.findOne(id);
    } catch {
      throw new UnprocessableEntityException(Errors.ALBUM_NOT_EXISTS);
    }

    const index = this.albums.findIndex(
      (item) => item.userId === userId && item.id === id,
    );

    if (index === -1) {
      this.albums.push({ userId, id });
    }
    // TODO: else - error?
  }

  async removeAlbum(id: string, userId: string) {
    const index = this.albums.findIndex(
      (item) => item.userId === userId && item.id === id,
    );

    if (index === -1) {
      throw new NotFoundException(Errors.ALBUM_NOT_FOUND);
    }

    this.albums.splice(index, 1);
  }

  async addTrack(id: string, userId: string) {
    try {
      await this.tracksService.findOne(id);
    } catch {
      throw new UnprocessableEntityException(Errors.TRACK_NOT_EXISTS);
    }

    const index = this.tracks.findIndex(
      (item) => item.userId === userId && item.id === id,
    );

    if (index === -1) {
      this.tracks.push({ userId, id });
    }
    // TODO: else - error?
  }

  async removeTrack(id: string, userId: string) {
    const index = this.tracks.findIndex(
      (item) => item.userId === userId && item.id === id,
    );

    if (index === -1) {
      throw new NotFoundException(Errors.TRACK_NOT_FOUND);
    }

    this.tracks.splice(index, 1);
  }

  async buildFavoritesResponse(favorites) {
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
