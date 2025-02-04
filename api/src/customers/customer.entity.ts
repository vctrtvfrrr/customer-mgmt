import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'bigint', default: 0, nullable: false, unsigned: true })
  salary: number;

  @Column({ type: 'bigint', default: 0, nullable: false, unsigned: true })
  companyValue: number;
}
