import { Column, Entity, PrimaryColumn } from 'typeorm';
import { transformerJSON, UserExtendType, UserExtendValue } from '@reverie/share';

export type UserExtendEntityValue = { value: UserExtendValue };

@Entity('userExtend')
export class UserExtendEntity {
  @PrimaryColumn({
    type: 'unsigned big int',
  })
  id!: number;

  @Column({ type: 'unsigned big int' })
  userId!: number;

  @Column({ type: 'char', enum: UserExtendType })
  type!: string;

  @Column({ type: 'json', transformer: transformerJSON })
  extend!: UserExtendEntityValue;
}
