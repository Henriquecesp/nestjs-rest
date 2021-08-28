import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { NestResponse } from '../core/http/nest-response';
import { NestResponseBuilder } from '../core/http/nest-response-build';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  public create(@Body() user: User): NestResponse {
    this.userService.create(user);

    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeader({
        Location: `/users/${user.username}`,
      })
      .withBody(user)
      .build();
  }

  @Get('/:username')
  getByUsername(@Param('username') username: string): User {
    const user = this.userService.getByUsername(username);
    if (!user) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        message: `User with username ${username} not found`,
      });
    }
    return user;
  }
}
