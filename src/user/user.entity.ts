import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString, NotContains } from 'class-validator';
import { IsUsernameUnique } from './is-username-unique.validator';

export class User {
  id: number;

  @IsNotEmpty()
  @IsString()
  @NotContains(' ', { message: 'Slug should NOT contain any whitespace.' })
  @IsUsernameUnique({
    message: 'Username is already taken.',
  })
  username: string;

  @IsNotEmpty({
    message: 'Password is required',
  })
  @Exclude({
    toPlainOnly: true,
  })
  password: string;
}
