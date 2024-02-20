export enum AuthType {
    password = 'ps',
    mobile = 'mo'
}

export type AuthData = Record<AuthType, string>;
