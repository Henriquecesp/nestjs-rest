import { Module } from '@nestjs/common';
import { IsUsernameUniqueConstraint } from './is-username-unique.validator';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, IsUsernameUniqueConstraint],
})
export class UserModule {}
