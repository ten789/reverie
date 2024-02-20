import { UserExtend } from '@reverie/share';

export class CreateUserDto {
  valid!: boolean;
}

export class UserExtendDto {
  useId!: number;
  extend!: UserExtend;
}
