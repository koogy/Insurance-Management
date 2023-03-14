import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from 'typeorm';
import { ContractEntity } from '../contract/contract.entity';

@Entity()
export class AccidentEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'varchar', length: 120 })
    public accidentType: string;

    @ManyToOne(() => ContractEntity, (contract) => contract.accidents)
    public contract: ContractEntity;
}
