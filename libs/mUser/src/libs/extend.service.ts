import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, In, Repository } from 'typeorm';
import { UserExtendEntity, UserExtendEntityValue, UserExtendLogEntity } from '../entitles';
import { UserExtendDto } from '../dtos';
import { DatabaseOperate, now, UserExtendType } from '@reverie/share';

@Injectable()
export class UserExtendService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly userExtendRepository: Repository<UserExtendEntity>,
  ) {}

  replace(userExtendDto: UserExtendDto) {
    return this.dataSource.transaction(async (manager) =>
      Promise.all(
        Object.keys(userExtendDto.extend).map(async (type) => {
          const old = await manager.findOneBy(UserExtendEntity, { userId: userExtendDto.useId, type });
          if (old) {
            if (old.extend.value === userExtendDto.extend[type as UserExtendType]) {
              return true;
            } else {
              const value = { value: userExtendDto.extend[type as UserExtendType] };
              await this.log(manager, {
                originId: old.id,
                operate: DatabaseOperate.update,
                type: type as UserExtendType,
                originValue: old.extend,
                value,
              });
              return manager.update(UserExtendEntity, { id: old.id }, { extend: value }).then((r) => r.affected === 1);
            }
          } else {
            const value = { value: userExtendDto.extend[type as UserExtendType] };
            const userExtend = new UserExtendEntity();
            userExtend.userId = userExtendDto.useId;
            userExtend.type = type;
            userExtend.extend = value;
            await this.log(manager, {
              originId: 0,
              operate: DatabaseOperate.create,
              type: type as UserExtendType,
              originValue: null,
              value,
            });
            return manager.save(userExtend).then((r) => r.id > 0);
          }
        }),
      ).then((r) => r.every((o) => o)),
    );
  }

  async get(userId: number, types?: UserExtendType[]) {
    const data = await this.userExtendRepository.find({
      select: ['type', 'extend'],
      where: { userId, ...(types ? { type: In(types) } : {}) },
    });
    const result = new UserExtendDto();
    result.useId = userId;
    for (const d of data) {
      result.extend[d.type as UserExtendType] = d.extend.value;
    }
    return result;
  }

  async delete(userId: number, type: UserExtendType) {
    const data = await this.userExtendRepository.findOneBy({ userId, type });
    if (data) {
      return this.dataSource.transaction((manager) =>
        Promise.all([
          this.log(manager, {
            originId: data.id,
            operate: DatabaseOperate.delete,
            type: data.type as UserExtendType,
            originValue: data.extend,
            value: null,
          }),
          manager.delete(UserExtendEntity, { userId, type }).then((r) => r.affected === 1),
        ]).then((r) => r.every((o) => o)),
      );
    } else {
      return false;
    }
  }

  protected async log(
    manager: EntityManager,
    data: {
      originId: number;
      operate: DatabaseOperate;
      type: UserExtendType;
      originValue: null | UserExtendEntityValue;
      value: null | UserExtendEntityValue;
    },
  ) {
    const log = new UserExtendLogEntity();
    log.originId = data.originId;
    log.operate = DatabaseOperate.delete;
    log.date = now;
    log.type = data.type;
    log.originValue = data.value;
    log.value = null;
    const r = await manager.insert(UserExtendLogEntity, log);
    return r.raw.id > 0;
  }
}
