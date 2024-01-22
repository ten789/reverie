import { Column, Entity, PrimaryColumn } from 'typeorm';
import { DatabaseOperate, transformerDateTime, transformerJSON, UserExtendType, UserExtendValue } from '@reverie/share';

@Entity('userExtendLog')
export class UserExtendLogEntity {
  @PrimaryColumn()
  id!: number;

  @Column({ type: 'unsigned big int' })
  originId!: number;

  @Column({ type: 'datetime', transformer: transformerDateTime })
  date!: string;

  @Column({ type: 'enum', enum: DatabaseOperate })
  operate!: string;

  @Column({ type: 'char', enum: UserExtendType })
  type!: string;

  @Column({ type: 'json', nullable: true, transformer: transformerJSON })
  originValue!: null | { value: UserExtendValue };

  @Column({ type: 'json', nullable: true, transformer: transformerJSON })
  value!: null | { value: UserExtendValue };
}
