import {Controller, Get, Render} from '@nestjs/common';

@Controller('signup')
export class SignupController {

    @Get('')
    @Render('sign-up')
    signUp() {
        return {
            signUpMessage: 'Inscrits-toi en 30 secondes!'
        }
    }
}
