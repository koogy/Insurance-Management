import { Controller, Get, Post, Render, Body, Inject } from '@nestjs/common';
import { AuthService } from '../api/auth/auth.service';
import { signInDTO } from '../api/auth/dto/auth.dto';

@Controller('signin')
export class SigninController {
  @Inject(AuthService)
  private readonly authService: AuthService;

  @Get('')
  @Render('login')
  login() {
    return { message: 'Connecte toi !' };
  }

  @Post('login')
  @Render('login')
  async login_post(@Body() data: signInDTO) {
    const user = await this.authService.signIn(data)
    if (user) {
      return this.login_success();
    }
    return this.login_failed();
  }

  @Get('success')
  @Render('login')
  login_success() {
    return { message: 'Connecté avec succès !' };
  }

  @Get('failure')
  @Render('login')
  login_failed() {
    return { message: 'Connexion échouée !' };
  }
}