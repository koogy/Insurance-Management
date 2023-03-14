import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
} from '@nestjs/common';
import { AccidentService } from './accident.service';
import { AccidentEntity } from './accident.entity';
import { AccidentCommand } from './accident.command';
import { ContractService } from '../contract/contract.service';


@Controller('accident')
export class AccidentAPI {

    constructor(
        private readonly accidentService: AccidentService,
        private readonly contractService: ContractService,
    ) { }

    @Get('list')
    public async list(): Promise<AccidentEntity[]> {
        return await this.accidentService.findAll()
    }

    @Get('list/:email')
    public async listByEmail(@Param('email') email: string): Promise<AccidentEntity[]> {
        return await this.accidentService.findByEmail(email)
    }

    @Get(':id')
    public async get(@Param('id', ParseIntPipe) id: number): Promise<AccidentEntity> {
        return await this.accidentService.get(id);
    }

    @Post()
    public async create(@Body() accident: AccidentCommand): Promise<AccidentEntity> {
        const contract = await this.contractService.get(accident.contractId);
        return await this.accidentService.create(accident, contract);
    }
}