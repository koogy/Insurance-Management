import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailModule} from "../email/email.module";
import EmailService from '../email/email.service';
import { EmailConfirmationService } from '../email/emailConfirmation.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from "@nestjs/jwt";
import {UserService} from "../user/user.service";

@Module({
  imports: [UserModule, EmailModule],
  controllers: [AuthController],
  providers: [AuthService, EmailConfirmationService, ConfigService, EmailService, JwtService, UserService],
  exports: [AuthService]
})
export class AuthModule { }
