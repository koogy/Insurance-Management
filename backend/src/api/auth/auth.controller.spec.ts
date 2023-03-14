import { Test, TestingModule } from '@nestjs/testing';
import { EmailConfirmationService } from '../email/emailConfirmation.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockUsers = [{
    email: 'some',
    password: 'some',
  }]

  const MockAuthService = {
    signup: jest.fn(signUpDTO => {
      return {
        id: Math.random(),
        ...signUpDTO
      }
    }),
    signIn: jest.fn(signInDTO => signInDTO)
  }

  const MockEmailService = {
    sendVerificationLink: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, EmailConfirmationService],
    })
      .overrideProvider(AuthService)
      .useValue(MockAuthService)
      .overrideProvider(EmailConfirmationService)
      .useValue(MockEmailService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    const user = {
      firstName: 'some',
      lastName: 'some',
      email: 'some',
      password: 'some',
      phoneNumber: 'some',
      city: 'some',
      address: 'some',
      postalCode: '10000',
    };

    expect(controller.signup(user)).toEqual({
      id: expect.any(Number),
      firstName: 'some',
      lastName: 'some',
      email: 'some',
      password: 'some',
      phoneNumber: 'some',
      city: 'some',
      address: 'some',
      postalCode: '10000',
    });
  });


  it('should match user`s email/pw from the db ', () => {
    const user = {
      email: 'some',
      password: 'some',
    };
    expect(mockUsers).toContainEqual(controller.signin(user));
  });

});
