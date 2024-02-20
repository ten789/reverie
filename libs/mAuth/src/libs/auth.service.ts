import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { now, AuthType } from '@reverie/share';
import { AuthDto, CreateAuthDto } from '../dtos';
import { AuthEntity } from '../entitles';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authRepository: Repository<AuthEntity>
  ) {}

  getAccessToken(id: number) {
    return this.jwtService.sign({ id });
  }

  async createAuth(authData: CreateAuthDto): Promise<boolean> {
    switch(authData.type) {
      case AuthType.password:
        return this.createAuthByPassword(authData);
      case AuthType.mobile:
        return this.createAuthByMobile(authData);
    }
  }

  async authenticate(authData: AuthDto): Promise<number | false | null> {
    switch(authData.type) {
      case AuthType.password:
        return this.authenticatePassword(authData);
      case AuthType.mobile:
        return this.authenticateMobile(authData);
    }
  }

  private async createAuthByPassword(authData: CreateAuthDto): Promise<boolean> {
    const find = await this.authRepository.countBy({ type: AuthType.password, data: authData.data });
    if(find === 0) {
      const insertData = new AuthEntity;
      insertData.type = AuthType.password;
      insertData.uid = authData.uid;
      insertData.data = authData.data;
      insertData.access = authData.access;
      return (await this.authRepository.save(insertData)) !== undefined;
    }
    return false;
  }

  private async authenticatePassword(authData: AuthDto): Promise<number | null> {
    const localData = await this.authRepository.findOneBy({ type: AuthType.password, data: authData.data });
    if(localData?.access === authData.access) {
      return localData.id as number;
    }
    return null;
  }

  private async createAuthByMobile(authData: CreateAuthDto): Promise<boolean> {
    const old = await this.authRepository.findOneBy({ type: AuthType.mobile, uid: authData.uid, data: authData.data });
    if(old) {
      const newData = new AuthEntity;
      newData.createDate = now;
      return !!(await this.authRepository.update(newData, { id: old.id }));
    } else {
      const newData = new AuthEntity;
      newData.type = AuthType.mobile;
      newData.createDate = now;
      newData.uid = authData.uid;
      newData.data = authData.data;
      newData.access = authData.access;
      return !!(await this.authRepository.save(newData));
    }
  }

  private async authenticateMobile(authData: AuthDto): Promise<number | null> {
    const localData = await this.authRepository.findOneBy({ type: AuthType.mobile, data: authData.data });
    if(localData?.access === authData.access) {
      return localData.uid;
    }
    return null;
  }
}
