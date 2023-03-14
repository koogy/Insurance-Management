import { Test, TestingModule } from '@nestjs/testing';
import { QuoteUsecase } from '../api/quote/quote.usecase';
import { QuoteController } from './quote.controller';

describe('QuoteController', () => {
  let controller: QuoteController;

  const mockQuotes = [{ id: 1, address: 'some', premium: 100, name: 'some', email: 'some', city: 'some', postalCode: '10000', housingType: "Appartement", nbFloors: 1, nbRooms: 3, surfaceArea: 20 }]

  const MockQuoteService = {
    get: jest.fn(),
    findAll: jest.fn().mockImplementation(() => mockQuotes),
    create: jest.fn(dto => {
      return {
        id: Math.random(),
        ...dto
      }
    }),
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuoteController],
      providers: [QuoteUsecase],
    })
      .overrideProvider(QuoteUsecase)
      .useValue(MockQuoteService)
      .compile();

    controller = module.get<QuoteController>(QuoteController);
  });

  describe('get Index', () => {

    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should return a catchphrase', () => {
      expect(controller.index()).toEqual({
        message: 'Get your home insured within 3 minutes!',
      });
    });

    it('should create a quote ', async () => {
      const quote = {
        name: 'some',
        address: 'some',
        email: 'some',
        city: 'some',
        postalCode: '10000',
        housingType: "Appartement", 
        nbFloors: "1", 
        nbRooms: "3", 
        surfaceArea: "20",
      }
      expect({
        id: expect.any(Number),
        name: 'some',
        address: 'some',
        email: 'some',
        city: 'some',
        postalCode: '10000',
        housingType: "Appartement", 
        nbFloors: "1", 
        nbRooms: "3", 
        surfaceArea: "20",
        premium: expect.any(Number)
      }).toMatchObject(await controller.subscribe(quote))
    });


    it('should return a list of quote', async () => {
      expect((await controller.list()).quotes).toBe(mockQuotes)
    })
  });
});
