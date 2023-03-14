import { QueryBuilder, Repository } from 'typeorm';
import EmailService from '../email/email.service';
import { ContractEntity } from './contract.entity';
import { ContractService } from './contract.service';

describe('ContractService', () => {
  it('should get all contracts', async () => {
    const actual = jest.requireActual('typeorm');
    const data = [
      {
        id: 1,
        address: '55 rue de Rivoli',
        premium: 140,
        name: 'John Doe',
        email: 'john.doe@mail.com',
        postalCode: '75001',
        state: 'Confirmé',
        housingType: "Appartement", 
        nbFloors: 1, 
        nbRooms: 3, 
        surfaceArea: 20
      },
      {
        id: 2,
        address: '57 rue de Rivoli',
        premium: 140,
        name: 'John Doe',
        email: 'john.doe@mail.com',
        postalCode: '75001',
        state: 'Signé',
        housingType: "Appartement", 
        nbFloors: 1, 
        nbRooms: 3, 
        surfaceArea: 20
      },
    ];

    const contractRepository: Repository<ContractEntity> = {
      ...actual,
      find: jest.fn().mockResolvedValue(data),
    };

    const emailService: EmailService = {
      ...actual,
    };
    

    const contractUsecase = new ContractService(contractRepository,emailService);
    const contract = await contractUsecase.findAll();

    expect(contract[0].id).toEqual(1);
    expect(contract[0].address).toEqual(data[0].address);
    expect(contract[0].name).toEqual(data[0].name);
    expect(contract[0].email).toEqual(data[0].email);
    expect(contract[0].postalCode).toEqual(data[0].postalCode);
    expect(contract[0].state).toEqual(data[0].state);
    expect(contract[0].housingType).toEqual(data[0].housingType);
    expect(contract[0].nbFloors).toEqual(data[0].nbFloors);
    expect(contract[0].nbRooms).toEqual(data[0].nbRooms);
    expect(contract[0].surfaceArea).toEqual(data[0].surfaceArea);

    expect(contract[1].id).toEqual(2);
    expect(contract[1].address).toEqual(data[1].address);
  });
  it('should convert change state correctly', async () => {
    const actual = jest.requireActual('typeorm');

    const contractRepository: Repository<ContractEntity> = {
      ...actual,
      findOneBy: jest.fn().mockResolvedValue({
        id: 1,
        address: '55 rue de Rivoli',
        premium: 140,
        name: 'John Doe',
        email: 'john.doe@mail.com',
        postalCode: '75001',
        state: 'Signé',
        housingType: "Appartement", 
        nbFloors: 1, 
        nbRooms: 3, 
        surfaceArea: 20
      }),
      save: jest.fn().mockResolvedValue({
        id: 1,
        address: '55 rue de Rivoli',
        premium: 140,
        name: 'John Doe',
        email: 'john.doe@mail.com',
        postalCode: '75001',
        state: 'Confirmé',
        housingType: "Appartement", 
        nbFloors: 1, 
        nbRooms: 3, 
        surfaceArea: 20
      }),
    };

    const emailService: EmailService = {
      ...actual,
    };

    const contractUsecase = new ContractService(contractRepository,emailService);
    let contract = await contractUsecase.get(1);

    expect(contract.state).toEqual('Signé');
    contract = await contractUsecase.update(1, 'Confirmé');
    expect(contract.state).toEqual('Confirmé');
  });
  it('should terminate the contract', async () => {
    const actual = jest.requireActual('typeorm');

    const contractRepository: Repository<ContractEntity> = {
      ...actual,
      findOneBy: jest.fn().mockResolvedValue({
        id: 1,
        address: '55 rue de Rivoli',
        premium: 140,
        name: 'John Doe',
        email: 'john.doe@mail.com',
        postalCode: '75001',
        state: 'Signé',
        housingType: "Appartement", 
        nbFloors: 1, 
        nbRooms: 3, 
        surfaceArea: 20
      }),
      save: jest.fn().mockResolvedValue({
        id: 1,
        address: '55 rue de Rivoli',
        premium: 140,
        name: 'John Doe',
        email: 'john.doe@mail.com',
        postalCode: '75001',
        state: 'Résilié',
        housingType: "Appartement", 
        nbFloors: 1, 
        nbRooms: 3, 
        surfaceArea: 20
      }),
    };

    const emailService: EmailService = {
      ...actual,
    };

    const contractUsecase = new ContractService(contractRepository,emailService);
    let contract = await contractUsecase.get(1);

    expect(contract.state).toEqual('Signé');
    contract = await contractUsecase.terminateContract(1);
    expect(contract.state).toEqual('Résilié');
  });
  it('should expirate the contract', async () => {
    const queryBuilder: any = {
      update: jest.fn().mockReturnThis(),
      set: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      execute: jest.fn().mockImplementationOnce(() => {
          return {
            id: 1,
            address: '55 rue de Rivoli',
            premium: 140,
            name: 'John Doe',
            email: 'john.doe@mail.com',
            postalCode: '75001',
            state: 'Expiré',
            updatedAt: new Date(2020, 9, 14),
            housingType: "Appartement", 
            nbFloors: 1, 
            nbRooms: 3, 
            surfaceArea: 20
          }
      })
    }

    jest.spyOn(QueryBuilder.prototype, 'update')
      .mockReturnValueOnce(queryBuilder);
    
    expect(queryBuilder.execute().state).toEqual('Expiré');
  })
  it('the contract have to be renewal before expiration date', async () => {
    const actual = jest.requireActual('typeorm');

    const contractRepository: Repository<ContractEntity> = {
      ...actual,
      findOneBy: jest.fn().mockResolvedValue({
        id: 1,
        address: '55 rue de Rivoli',
        premium: 140,
        name: 'John Doe',
        email: 'john.doe@mail.com',
        postalCode: '75001',
        state: 'Confirmé',
        housingType: "Appartement",
        nbFloors: 1,
        nbRooms: 3,
        surfaceArea: 20
      }),
      save: jest.fn().mockResolvedValue({
        id: 1,
        address: '55 rue de Rivoli',
        premium: 140,
        name: 'John Doe',
        email: 'john.doe@mail.com',
        postalCode: '75001',
        state: 'Renouveler',
        housingType: "Appartement",
        nbFloors: 1,
        nbRooms: 3,
        surfaceArea: 20
      }),
    };

    const emailService: EmailService = {
      ...actual,
    };

    const contractUsecase = new ContractService(contractRepository,emailService);
    let contract = await contractUsecase.get(1);

    expect(contract.state).toEqual('Confirmé');
    contract = await contractUsecase.update(1, 'Renouveler');
    expect(contract.state).toEqual('Renouveler');
  });

  it('should set contract to Renouveler one month before', async () => {
    const queryBuilder: any = {
      update: jest.fn().mockReturnThis(),
      set: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      execute: jest.fn().mockImplementationOnce(() => {
          return {
            id: 1,
            address: '55 rue de Rivoli',
            premium: 140,
            name: 'John Doe',
            email: 'john.doe@mail.com',
            postalCode: '75001',
            state: 'Renouveler',
            expirationDate: new Date(2022, 12, 1),
            housingType: "Appartement", 
            nbFloors: 1, 
            nbRooms: 3, 
            surfaceArea: 20
          }
      })
    }

    function getDayDiff(startDate: Date, endDate: Date): number {
      const msInDay = 24 * 60 * 60 * 1000;
    
      return Math.round(Math.abs(Number(endDate) - Number(startDate)) / msInDay);
    }
    
    const getNow = () => new Date(Date.now());
    const contract = queryBuilder.execute()

    jest
    .spyOn(global.Date, 'now')
    .mockImplementationOnce(() =>
      new Date(2022,11,5).valueOf()
    );

    expect(getDayDiff(contract.expirationDate,getNow())).toBeLessThan(30);
    jest.spyOn(QueryBuilder.prototype, 'update')
      .mockReturnValueOnce(queryBuilder);
    expect(contract.state).toEqual('Renouveler');
  })
});
