import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entitles';
import { CreateUserDto } from '../dtos';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: Repository<UserEntity>) {}

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = new UserEntity();
    user.valid = createUserDto.valid;
    return this.userRepository.save(user);
  }

  get(userId: number): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ id: userId });
  }

  async update(user: UserEntity): Promise<boolean> {
    return (await this.userRepository.update({ id: user.id }, user)).affected === 1;
  }
}
