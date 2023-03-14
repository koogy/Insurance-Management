import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Quote } from './quote.entity';
import { QuoteUsecase } from './quote.usecase';

describe('QuoteUsecase', () => {
  let service: QuoteUsecase;

  const mockQuotes = [{ id: 1, address: 'some', premium: 185, name: 'some', email: 'some', city: 'some', postalCode: '10000', signed: false, createdAt: new Date("2022-11-10T12:54:57.625Z"), updatedAt: new Date("2022-11-10T12:54:57.625Z"), housingType: "Appartement", nbFloors: 1, nbRooms: 3, surfaceArea: 20 },
  { id: 2, address: 'some', premium: 100, name: 'some', email: 'some', city: 'some', postalCode: '10000',signed: true, createdAt: new Date("2022-11-10T12:54:57.625Z"), updatedAt: new Date("2022-11-10T12:54:57.625Z"), housingType: "Appartement", nbFloors: 1, nbRooms: 3, surfaceArea: 20 }]


  const oneQuote: Quote = ({ id: 1, address: 'some', premium: 185, name: 'some', email: 'some', city: 'some', postalCode: '10000', signed: false, createdAt: new Date("2022-11-10T12:54:57.625Z"), updatedAt: new Date("2022-11-10T12:54:57.625Z"),housingType: "Appartement", nbFloors: 1, nbRooms: 3, surfaceArea: 20 });

  const mockQuotesRepository = {
    find: jest.fn().mockResolvedValue(mockQuotes),
    findOneBy: jest.fn().mockResolvedValue(oneQuote),
    findBy: jest.fn().mockResolvedValue(oneQuote),
    save: jest.fn(dto => Promise.resolve({ id: 1, ...dto, city: 'some', signed: false, createdAt: new Date("2022-11-10T12:54:57.625Z"), updatedAt: new Date("2022-11-10T12:54:57.625Z") })),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuoteUsecase, {
        provide: getRepositoryToken(Quote),
        useValue: mockQuotesRepository
      }],
    })
      .compile();

    service = module.get<QuoteUsecase>(QuoteUsecase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const quotes = await service.findAll();
      expect(quotes).toEqual(mockQuotes);
    });
  });


  describe('get', () => {
    it('should get one quote', () => {
      expect(service.get(1)).resolves.toEqual(oneQuote);
    });
  });


  describe('findByEmail', () => {
    it('should get one quote', () => {
      expect(service.findByEmail('some')).resolves.toEqual(oneQuote);
    });
  });

  describe('create', () => {
    it('should get one quote', async () => {
      expect(await service.create({ address: 'some', name: 'some', email: 'some', city: 'some', postalCode: '10000', housingType: "Appartement", nbFloors: "1", nbRooms: "3", surfaceArea: "20" })).toEqual(oneQuote);
    });
  });

});
