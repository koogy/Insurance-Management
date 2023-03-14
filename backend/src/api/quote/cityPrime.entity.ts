import {
  Column, Entity, PrimaryColumn
} from 'typeorm';

@Entity()
export class CityPrime {
  @PrimaryColumn()
  city: string;

  @Column()
  value: number;
}
