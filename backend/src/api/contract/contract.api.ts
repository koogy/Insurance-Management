import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
} from '@nestjs/common';
import {ContractService} from "./contract.service";
import {ContractEntity} from "./contract.entity";
import {ContractCommand} from "./contract.command";
import { DeleteResult } from 'typeorm';
import { UserService } from '../user/user.service';
import EmailService from '../email/email.service';


@Controller('contract')
export class ContractApi {

    constructor(
        private readonly contractService: ContractService,
        private readonly emailService: EmailService,
        private readonly userService: UserService
    ) { }

    @Get('list')
    public async list(): Promise<ContractEntity[]> {
        return await this.contractService.findAll()
    }

    @Get(':id')
    public async get(@Param('id', ParseIntPipe) id: number): Promise<ContractEntity> {
        return await this.contractService.get(id);
    }

    @Post()
    public async create(@Body() contract: ContractCommand): Promise<ContractEntity> {
        return await this.contractService.create(contract);
    }

    @Post('updateState/:id')
    public async update(@Body() data: {state: string}, @Param('id') id: number): Promise<ContractEntity> {
        return await this.contractService.update(id, data.state);
    }

    @Post('updateExpirationDate/:id')
    public async updateExpirationDate(@Body() data: {expirationDate: Date}, @Param('id') id: number): Promise<ContractEntity> {
        return await this.contractService.updateExpirationDate(id, data.expirationDate);
    } 


    @Post('updateNotified/:id')
    public async updateNotified(@Body() data: { notified: boolean}, @Param('id') id: number): Promise<ContractEntity> {
        return await this.contractService.updateNotified(id, data.notified);
    } 

    
    @Post('terminate/:id')
    public async terminate(@Param('id') id: number, @Body() data: {email: string}): Promise<ContractEntity> {
        const result = await this.contractService.terminateContract(id)
        const user = await this.userService.getByEmail(data.email)
        this.emailService.sendTerminatedContractConfirmation(user.email, user.firstName, user.lastName)
        return result
    }

    @Get('list/:email')
    public async getByEmail(@Param('email') email: string): Promise<ContractEntity[]> {
        return await this.contractService.findByEmail(email);
    }

    @Post('delete/:id')
    public async delete(@Param('id') id: number): Promise<DeleteResult> {
        return await this.contractService.delete(id)
    }

    @Get('state/:state')
    public async getByState(@Param('state') state: string): Promise<ContractEntity[]> {
        return await this.contractService.findByState(state);
    }

    @Get('expiring/:id')
    async sendExpiringContract(@Param('id') id: number) {
        console.log("Sending mal expiring contract")
        const contract = await this.contractService.get(id)
        return await this.emailService.sendExpiringContract(contract);
    }
}