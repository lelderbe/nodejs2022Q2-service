import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({ format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'TestUser' })
  @Column()
  login: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @VersionColumn()
  version: number;

  @ApiProperty({ example: 1655000000 })
  @CreateDateColumn({
    transformer: {
      from: (value) => value.getTime(),
      to: (value) => value,
    },
  })
  createdAt: number;

  @ApiProperty()
  @UpdateDateColumn({
    transformer: {
      from: (value) => value.getTime(),
      to: (value) => value,
    },
  })
  updatedAt: number;
}
