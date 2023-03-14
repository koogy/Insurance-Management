import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { AccidentEntity } from './accident.entity';
import { AccidentCommand } from './accident.command';
import { ContractEntity } from '../contract/contract.entity';


@Injectable()
export class AccidentService {
    @InjectRepository(AccidentEntity)
    private readonly repository: Repository<AccidentEntity>;

    public async findAll(): Promise<AccidentEntity[]> {
        return await this.repository.find({
            relations: ["contract"]
        });
    }


    public async findByEmail(email: string): Promise<AccidentEntity[]> {
        return await this.repository.find({ 
            relations: {
                contract: true
            },
            where : {
                contract : {
                    email: email
                }
            }
        });
    }

    public async get(id: number): Promise<AccidentEntity> {
        return await this.repository.findOneBy({ id });
    }

    public async create(body: AccidentCommand, contract : ContractEntity): Promise<AccidentEntity> {
        const accidentEntity: AccidentEntity = new AccidentEntity();

        accidentEntity.accidentType = body.accidentType;
        accidentEntity.contract = contract;

        return await this.repository.save(accidentEntity);
    }
}