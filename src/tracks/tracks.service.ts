import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { Errors } from '../app/constants';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
  ) {}

  async create(input: CreateTrackDto): Promise<Track> {
    const track = this.tracksRepository.create(input);
    return this.tracksRepository.save(track);
  }

  async findAll(): Promise<Track[]> {
    return this.tracksRepository.find();
  }

  async findOne(id: string): Promise<Track> {
    const track = await this.tracksRepository.findOneBy({ id });

    if (!track) {
      throw new NotFoundException(Errors.TRACK_NOT_FOUND);
    }

    return track;
  }

  async update(id: string, input: UpdateTrackDto): Promise<Track> {
    const track = Object.assign(await this.findOne(id), input);
    return this.tracksRepository.save(track);
  }

  async remove(id: string): Promise<Track> {
    const track = await this.findOne(id);
    return this.tracksRepository.remove(track);
  }
}
