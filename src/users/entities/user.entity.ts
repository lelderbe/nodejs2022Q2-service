import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ example: 'TestUser' })
  login: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  version: number;

  @ApiProperty({ example: 1655000000 })
  createdAt: number;

  @ApiProperty()
  updatedAt: number;
}
