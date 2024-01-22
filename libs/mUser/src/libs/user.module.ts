import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserExtendService } from './extend.service';
import { UserEntity, UserExtendEntity } from '../entitles';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserExtendEntity])],
  providers: [UserService, UserExtendService],
  exports: [UserService, UserExtendService],
})
export class UserModule {}
