import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../api/auth/auth.service';
import { SigninController } from './signin.controller';

describe('SigninController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [SigninController],
      providers: [
        AuthService,
        {
          provide: AuthService,
          useValue: {
            signup: jest.fn(),
            findOne: jest.fn(),
            signIn: jest.fn(),
          },
        },
      ],
    }).compile();
  });

  describe('Login Unit Tests', () => {
    it('login page should return a catchphrase', () => {
      const signinController = app.get<SigninController>(SigninController);
      expect(signinController.login()).toEqual({
        message: 'Connecte toi !',
      });
    });

    it('should return a catchphrase on a success', () => {
      const signinController = app.get<SigninController>(SigninController);
      expect(signinController.login_success()).toEqual({
        message: 'Connecté avec succès !',
      });
    });

    it('should return a catchphrase on a failure', () => {
      const signinController = app.get<SigninController>(SigninController);
      expect(signinController.login_failed()).toEqual({
        message: 'Connexion échouée !',
      });
    });
  });
});