import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { validateUUIDv4 } from '../utils/validate';
import { UserResponse } from './types/user-response.type';

@ApiTags('Users')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user', description: 'Creates a new user' })
  @ApiCreatedResponse({ description: 'The user has been created.' })
  @Post()
  async create(@Body() input: CreateUserDto): Promise<UserResponse> {
    const user = await this.usersService.create(input);
    return this.usersService.buildUserResponse(user);
  }

  @ApiOperation({ summary: 'Get all users', description: 'Gets all users' })
  @ApiOkResponse({ description: 'Successful operation' })
  @Get()
  async findAll(): Promise<UserResponse[]> {
    const users = await this.usersService.findAll();
    return this.usersService.buildUsersResponse(users);
  }

  @ApiOperation({
    summary: 'Get single user by id',
    description: 'Get single user by id',
  })
  @ApiOkResponse({ description: 'Successful operation' })
  @ApiBadRequestResponse({
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponse> {
    validateUUIDv4(id);
    const user = await this.usersService.findOne(id);
    return this.usersService.buildUserResponse(user);
  }

  @ApiOperation({
    summary: "Update a user's password",
    description: "Updates a user's password by ID",
  })
  @ApiOkResponse({
    description: 'The user has been updated.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiForbiddenResponse({ description: 'oldPassowrd is wrong' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() input: UpdateUserDto,
  ): Promise<UserResponse> {
    validateUUIDv4(id);
    const user = await this.usersService.update(id, input);
    return this.usersService.buildUserResponse(user);
  }

  @ApiOperation({ summary: 'Delete user', description: 'Deletes user by ID.' })
  @ApiNoContentResponse({ description: 'The user has been deleted' })
  @ApiBadRequestResponse({
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    validateUUIDv4(id);
    await this.usersService.remove(id);
  }
}
