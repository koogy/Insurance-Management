import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuoteApi } from './quote.api';
import { QuoteUsecase } from './quote.usecase';
import { Quote } from './quote.entity';
import { CityPrime } from './cityPrime.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quote, CityPrime])],
  controllers: [QuoteApi],
  providers: [QuoteUsecase],
  exports: [QuoteUsecase],
})
export class QuoteModule { }
