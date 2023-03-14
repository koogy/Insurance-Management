import { Test, TestingModule } from '@nestjs/testing';
import {SignupController} from "./signup.controller";

describe('SignupController', () => {
    let app: TestingModule;

    beforeAll(async () => {
        app = await Test.createTestingModule({
            controllers: [SignupController],
        }).compile();
    });

    describe('Signup Unit Tests', () => {
        it('signup page should return a catchphrase', () => {
            const signUpController = app.get<SignupController>(SignupController);
            expect(signUpController.signUp()).toEqual({
                signUpMessage: 'Inscrits-toi en 30 secondes!'
            });
        });
    });
});
