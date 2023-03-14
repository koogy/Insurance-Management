import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ContractEntity} from "./contract.entity";
import {ContractApi} from "./contract.api";
import {ContractService} from "./contract.service";
import { UserModule } from '../user/user.module';
import { EmailModule } from '../email/email.module';

@Module({
    imports: [TypeOrmModule.forFeature([ContractEntity]), EmailModule, UserModule],
    controllers: [ContractApi],
    providers: [ContractService],
    exports: [ContractService],
})
export class ContractModule { }
