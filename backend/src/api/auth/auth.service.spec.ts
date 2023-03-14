import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import * as argon from 'argon2';
describe('AuthService', () => {
  let service: AuthService;

  const mockUsers = [{
    firstName: 'Miau',
    lastName: 'some',
    email: 'some',
    password: 'some',
    phoneNumber: 'some',
    city: 'some',
    address: 'some',
    postalCode: '10000',
  }]

  const mockUsersRepository = {
    signup: jest.fn(),
    signIn: jest.fn(),
    save: jest.fn(user => Promise.resolve({ id: Math.random(), ...user })),
    findOneBy: jest.fn(email => (mockUsers.find((obj) => {
      return obj.email === email.email;
    })))

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, {
        provide: getRepositoryToken(User),
        useValue: mockUsersRepository
      }],
    })
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user and return ', async () => {
    const user = {
      firstName: 'Miau',
      lastName: 'some',
      email: 'some',
      password: 'some',
      phoneNumber: 'some',
      city: 'some',
      address: 'some',
      postalCode: '10000',
    };

    expect(await service.signup(user)).toEqual({
      id: expect.any(Number),
      firstName: 'Miau',
      lastName: 'some',
      email: 'some',
      password: expect.any(String),
      phoneNumber: 'some',
      city: 'some',
      address: 'some',
      postalCode: '10000',
    });
  });


  it('should find a user', async () => {
    const user = {
      email: 'some',
    };
    expect(await service.findOne(user.email)).toMatchObject(user);
  });


});
