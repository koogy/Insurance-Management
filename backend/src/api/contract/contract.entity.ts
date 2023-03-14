import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { AccidentEntity } from '../accident/accident.entity';

@Entity()
export class ContractEntity {
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

    @Column({ type: 'varchar', length: 120 })
    public state: string;

    @Column({ type: 'varchar', length: 5, default: '00000'})
    public postalCode: string;

    @Column({ type: 'varchar', length: 50, default: 'Appartement'})
    public housingType: string;

    @Column({ type: 'integer', default: 5})
    public nbRooms: number;

    @Column({ type: 'integer', default: 1})
    public nbFloors: number;

    @Column({ type: 'integer', default: 70})
    public surfaceArea: number;

    @OneToMany(() => AccidentEntity, (accident) => accident.contract)
    accidents: AccidentEntity[]

    /*
     * Create and Update Date Columns
     */

    @CreateDateColumn({ type: 'timestamp' })
    public createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    public updatedAt!: Date;

    @Column({ type: 'timestamp' , default: () => "CURRENT_TIMESTAMP + INTERVAL '1000' YEAR"  })
    public expirationDate!: Date;

    @Column({ type: 'boolean', default :false})
    public notified!: boolean;
}
