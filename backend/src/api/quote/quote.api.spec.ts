import { Test, TestingModule } from '@nestjs/testing';
import { QuoteApi } from './quote.api';
import { CreateQuoteCommand } from './quote.command';
import { QuoteUsecase } from './quote.usecase';

describe('QuoteApiController', () => {
  let controller: QuoteApi;

  const mockQuotes = [{ id: 1, address: 'some', premium: 100, name: 'some', email: 'some', city: 'some', postalCode: '10000', housingType: "Appartement", nbFloors: 1, nbRooms: 3, surfaceArea: 20 }, 
  { id: 2, address: 'some', premium: 100, name: 'some', email: 'some', city: 'some', postalCode: '10000', housingType: "Appartement", nbFloors: 1, nbRooms: 3, surfaceArea: 20 }]

  const mockQuotesRepository = {
    get: jest.fn().mockImplementation((id: number) =>
      Promise.resolve({ id, address: 'some', premium: 100, name: 'some', email: 'some', city: 'some', postalCode: '10000', housingType: "Appartement", nbFloors: 1, nbRooms: 3, surfaceArea: 20 }),
    ),
    findAll: jest.fn().mockResolvedValue(mockQuotes),
    findByEmail: jest.fn().mockImplementation((email: string) =>
      Promise.resolve({ address: 'some', premium: 100, name: 'some', email, city: 'some', postalCode: '10000', housingType: "Appartement", nbFloors: 1, nbRooms: 3, surfaceArea: 20 }),
    ),
    create: jest.fn().mockImplementation((quote: CreateQuoteCommand) =>
      Promise.resolve({ id: Math.random(), ...quote, premium: 100 }),
    )
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuoteApi],
      providers: [QuoteUsecase],
    })
      .overrideProvider(QuoteUsecase)
      .useValue(mockQuotesRepository)
      .compile();

    controller = module.get<QuoteApi>(QuoteApi);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('list', () => {
    it('should get an array of quotes', async () => {
      await expect(controller.list()).resolves.toEqual(mockQuotes);
    });
  });

  describe('getById', () => {
    it('should get a quote', async () => {
      await expect(controller.get(1)).resolves.toEqual({ id: 1, address: 'some', premium: 100, name: 'some', email: 'some', city: 'some', postalCode: '10000', housingType: "Appartement", nbFloors: 1, nbRooms: 3, surfaceArea: 20 });
      await expect(controller.get(2)).resolves.toEqual({ id: 2, address: 'some', premium: 100, name: 'some', email: 'some', city: 'some', postalCode: '10000', housingType: "Appartement", nbFloors: 1, nbRooms: 3, surfaceArea: 20 });
    });
  });

  describe('getByEmail', () => {
    it('should get a quote', async () => {
      await expect(controller.getByEmail('some')).resolves.toEqual({ address: 'some', premium: 100, name: 'some', email: 'some', city: 'some', postalCode: '10000', housingType: "Appartement", nbFloors: 1, nbRooms: 3, surfaceArea: 20 });

    });
  });

  describe('create', () => {
    it('should create a new quote', async () => {
      const newQuote: CreateQuoteCommand = { address: 'some', name: 'some', email: 'some', city: 'some', postalCode: '10000', housingType: "Appartement", nbFloors: "1", nbRooms: "3", surfaceArea: "20" }

      await expect(controller.create(newQuote)).resolves.toEqual({
        id: expect.any(Number),
        ...newQuote,
        premium: 100
      });
    });
  });
});
