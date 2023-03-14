import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractModule } from '../contract/contract.module';
import { AccidentAPI } from './accident.api';
import { AccidentEntity } from './accident.entity';
import { AccidentService } from './accident.service';

@Module({
    imports: [TypeOrmModule.forFeature([AccidentEntity]), ContractModule],
    controllers: [AccidentAPI],
    providers: [AccidentService],
    exports: [AccidentService],
})
export class AccidentModule { }
