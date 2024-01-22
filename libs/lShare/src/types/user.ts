export enum UserExtendType {
  createDate = 'cd',
  lastLoginDate = 'll',
  mobile = 'mb',
  email = 'em',
}

export type UserExtendValue = string | number | boolean;

export type UserExtend = Record<UserExtendType, UserExtendValue>;
