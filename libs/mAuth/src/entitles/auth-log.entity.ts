import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('auth-log')
export class AuthLogEntity {
  @PrimaryColumn({ type: 'unsigned big int' })
  id?: number;

  @Column( { type: 'unsigned big int' })
  authId!: number;

  @Column({ type: 'char' })
  type!: string;
}
