// isUserAlreadyExists with class-validator
import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from './user.service';

@Injectable()
@ValidatorConstraint()
export class IsUsernameUniqueConstraint
  implements ValidatorConstraintInterface
{
  constructor(private userService: UserService) {}
  validate(
    username: string,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    return !!!this.userService.getByUsername(username);
  }
}

export function IsUsernameUnique(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUsernameUniqueConstraint,
    });
  };
}
