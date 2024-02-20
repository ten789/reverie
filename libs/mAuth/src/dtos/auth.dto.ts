import { AuthType } from '@reverie/share'

export class CreateAuthDto {
    type!: AuthType;
    uid!: number;
    data!: string;
    access!: string;
}

export class AuthDto {
    type!: AuthType;
    data!: string;
    access!: string;
}
