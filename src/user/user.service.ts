import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 1,
      username: 'teste',
      password: 'teste',
    },
  ];
  public create(user: User): User {
    this.users.push(user);

    return user;
  }

  getByUsername(username: string): User {
    const foundUser = this.users.find((user) => user.username === username);
    return foundUser;
  }
}
