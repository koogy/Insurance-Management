import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Quote {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 120 })
  public address: string;

  @Column({ type: 'integer', nullable: true })
  public premium!: number;

  @Column({ type: 'varchar', length: 120 })
  public name: string;

  @Column({ type: 'varchar', length: 120 })
  public email: string;

  @Column({ type: 'varchar', length: 120 })
  public city: string;

  @Column({ type: 'varchar', length: 5, default: '00000' })
  public postalCode: string;

  @Column({ type: 'boolean' , default: false})
  public signed: boolean;

  @Column({ type: 'varchar', length: 50, default: 'Appartement'})
  public housingType: string;

  @Column({ type: 'integer', default: 5})
  public nbRooms: number;

  @Column({ type: 'integer', default: 1})
  public nbFloors: number;

  @Column({ type: 'integer', default: 70})
  public surfaceArea: number;

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
