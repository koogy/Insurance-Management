import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateQuoteCommand } from './quote.command';
import { Quote } from './quote.entity';

@Injectable()
export class QuoteUsecase {
  @InjectRepository(Quote)
  private readonly repository: Repository<Quote>;

  /* 
    @InjectRepository(CityPrime)
    private readonly repository_city_prime: Repository<CityPrime>; */

  public async get(id: number): Promise<Quote> {
    return await this.repository.findOneBy({ id });
  }

  public async findAll(): Promise<Quote[]> {
    return await this.repository.find();
  }

  public async findByEmail(email: string): Promise<Quote[]> {
    return await this.repository.findBy({ email: email });
  }

  public async create(body: CreateQuoteCommand): Promise<Quote> {
    const quote: Quote = new Quote();

    quote.name = body.name;
    quote.email = body.email;
    quote.address = body.address;
    quote.city = body.city;
    quote.postalCode = body.postalCode;
    quote.housingType = body.housingType;
    quote.nbFloors = parseInt(body.nbFloors);
    quote.nbRooms = parseInt(body.nbRooms);
    quote.surfaceArea = parseInt(body.surfaceArea);

    let quotePrice = quote.nbFloors * 100;
    quotePrice += quote.nbRooms * 15
    quotePrice += quote.surfaceArea * 2
    if (quote.housingType === "Maison") {
      quotePrice = Math.round(quotePrice * 1.5)
    }

    quote.premium = quotePrice;

    return await this.repository.save(quote);
  }

  public async delete(id: number): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }

  public async update(id: number, signed: boolean): Promise<Quote> {
    const result = await this.repository.update(id, {signed});

    return result.raw[0];
  }
}
