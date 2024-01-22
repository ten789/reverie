import { Entity, Column, PrimaryColumn } from 'typeorm';
@Entity('user')
export class UserEntity {
  @PrimaryColumn({ type: 'unsigned big int' })
  id?: number;

  @Column({ type: 'boolean', default: true })
  valid!: boolean;
}
