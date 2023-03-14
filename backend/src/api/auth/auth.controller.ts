import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDTO, signUpDTO } from './dto/auth.dto';
import { EmailConfirmationService } from "../email/emailConfirmation.service";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly emailConfirmationService: EmailConfirmationService) { }

  @Post('signup')
  signup(@Body() signUpDTO: signUpDTO) {
    const user = this.authService.signup(signUpDTO)
    this.emailConfirmationService.sendVerificationLink(signUpDTO.email, signUpDTO.firstName, signUpDTO.lastName)
    return user
  }

  @Post('signin')
  signin(@Body() signInDTO: signInDTO) {
    return this.authService.signIn(signInDTO)
  }

}
