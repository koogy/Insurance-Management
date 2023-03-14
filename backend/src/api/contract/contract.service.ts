import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Repository} from 'typeorm';
import {ContractEntity} from "./contract.entity";
import {ContractCommand} from "./contract.command";
import {Cron} from '@nestjs/schedule';
import EmailService from '../email/email.service';


@Injectable()
export class ContractService {
    constructor(
        @InjectRepository(ContractEntity) private readonly repository: Repository<ContractEntity>,
        private readonly emailService: EmailService,
    ) { }

    public async get(id: number): Promise<ContractEntity> {
        return await this.repository.findOneBy({ id });
    }

    public async findAll(): Promise<ContractEntity[]> {
        return await this.repository.find();
    }

    public async findByEmail(email: string): Promise<ContractEntity[]> {
        return await this.repository.findBy({ email: email })
    }

    public async create(body: ContractCommand): Promise<ContractEntity> {
        const contractEntity: ContractEntity = new ContractEntity();

        contractEntity.name = body.name;
        contractEntity.email = body.email;
        contractEntity.address = body.address;
        contractEntity.city = body.city;
        contractEntity.postalCode = body.postalCode;
        contractEntity.housingType = body.housingType;
        contractEntity.nbFloors = body.nbFloors;
        contractEntity.nbRooms = body.nbRooms;
        contractEntity.surfaceArea = body.surfaceArea;
        contractEntity.state = body.state;
        contractEntity.premium = body.premium;

        return await this.repository.save(contractEntity);
    }

    public async update(id: number, state: string): Promise<ContractEntity> {
        return await this.repository.save({
            id: id,
            state
        });
 
    }

    public async updateExpirationDate(id: number, date: Date): Promise<ContractEntity> {
        const result = await this.repository.update(id, {expirationDate : date});
        return result.raw[0];
    }

    public async updateNotified(id: number, bool: boolean): Promise<ContractEntity> {
        const result = await this.repository.update(id, {notified : bool});
        return result.raw[0];
    }
    public async terminateContract(id : number):  Promise<ContractEntity> {
        const state = "Résilié";

        return await this.repository.save({
            id: id,
            state
        });
    }

    public async delete(id: number): Promise<DeleteResult> {
        return await this.repository.delete(id);
    }

    /* Tous les jours à minuit */
    @Cron('0 0 * * *', {
        name: 'notifications',
        timeZone: 'Europe/Paris',
    })
    handleTimeout() {
  
        /* SET CONTRACT STATUS TO 'EXPIRE AFTER A YEAR' */
        this.repository
        .createQueryBuilder()
        .update(ContractEntity)
        .set({ state : "Expiré"})
        .where("(DATE_PART('day',\"expirationDate\" - CURRENT_TIMESTAMP)) >= 365 ")
        .execute()

        /* SET CONTRACT STATUS TO 'RENOUVELER' ONE MONTH BEFORE EXPIRATION*/
        this.repository
        .createQueryBuilder()
        .update(ContractEntity)
        .set({ state : "Renouveler"})
        .where("(DATE_PART('day',\"expirationDate\" - CURRENT_TIMESTAMP)) <= 30 ")
        .execute()

        /*  MAIL : RENEWAL NOTICE 1 MONTH BEFORE EXPIRATION  */
        this.repository
        .createQueryBuilder("contract_entity")
        .where("((DATE_PART('day',\"expirationDate\" - CURRENT_TIMESTAMP)) <= 30) and notified = false ")
        .getRawMany().then(response => {
            response.forEach(function(value){
            const contract : ContractEntity=  {
                id: value.contract_entity_id,
                address: value.contract_entity_address,
                premium: value.contract_entity_premium,
                name: value.contract_entity_name,

                email: value.contract_entity_email,
                city: value.contract_entity_city,

                state: value.contract_entity_state,
                postalCode: value.contract_entity_postalCode,
                housingType: value.contract_entity_housingType,
                nbFloors: value.contract_entity_nbFloors,
                nbRooms: value.contract_entity_nbRooms,
                surfaceArea: value.contract_entity_surfaceArea,
                createdAt : value.contract_entity_createdAt,
                updatedAt: value.contract_entity_updatedAt,
                expirationDate: value.contract_entity_expirationDate,
                notified: value.contract_entity_notified,
                accidents: []
            }

            this.emailService.sendExpiringContract(contract)
            /* Set notified to true (SEND MAIL ONCE, set back to false on renewal) */
            this.repository
            .createQueryBuilder()
            .update(ContractEntity)
            .set({notified: true})
            .where("(DATE_PART('day',\"expirationDate\" - CURRENT_TIMESTAMP)) <= 30 ")
            .andWhere("id = :id", { id: value.contract_entity_id })
            .execute()

            }.bind(this))
        })

    }

    public async findByState(state: string): Promise<ContractEntity[]> {
        return await this.repository.findBy({state: state});
    }
}