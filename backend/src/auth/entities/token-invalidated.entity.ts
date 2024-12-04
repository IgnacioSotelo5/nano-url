import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('invalidated_token')
export class InvalidatedToken {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', {length: 512})
  token: string;

  @Column({ type: 'timestamp' })
  invalidatedAt: Date;
}