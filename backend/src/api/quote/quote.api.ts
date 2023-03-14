import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateQuoteCommand } from './quote.command';
import { Quote } from './quote.entity';
import { QuoteUsecase } from './quote.usecase';

@Controller('quotes')
export class QuoteApi {
  @Inject(QuoteUsecase)
  private readonly quoteUsecase: QuoteUsecase;

  @Get('probes')
  public async probes(): Promise<string> {
    return 'up';
  }

  @Get('list')
  public async list(): Promise<Quote[]> {
    return await this.quoteUsecase.findAll()
  }

  @Get(':id')
  public async get(@Param('id', ParseIntPipe) id: number): Promise<Quote> {
    return await this.quoteUsecase.get(id);
  }

  @Post()
  public async create(@Body() quote: CreateQuoteCommand): Promise<Quote> {
    return await this.quoteUsecase.create(quote);
  }

  @Get('list/:email')
  public async getByEmail(@Param('email') email: string): Promise<Quote[]> {
    return await this.quoteUsecase.findByEmail(email);
  }

  @Post('delete/:id')
  public async delete(@Param('id') id: number): Promise<DeleteResult> {
    return await this.quoteUsecase.delete(id);
  }

  @Post('update/:id')
  public async update(@Param('id') id: number, @Body() data: {signed: boolean}): Promise<Quote> {
    return await this.quoteUsecase.update(id, data.signed);
  }
}
