import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('auth')
export class AuthEntity {
    @PrimaryColumn({ type: 'unsigned big int'})
    id?: number;

    @Column({ type: 'unsigned big int' })
    uid!: number;

    @Column({ type: 'datetime' })
    createDate!: string;

    @Column({ type: 'datetime' })
    lastDate!: string;

    @Column({ type: 'char' })
    type!: string;

    @Column({ type: 'char' })
    data!: string;

    @Column({ type: 'char' })
    access!: string;
}
