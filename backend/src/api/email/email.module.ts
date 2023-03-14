import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import EmailService from './email.service';
import { EmailConfirmationController } from './emailConfirmation.controller';
import { EmailConfirmationService } from './emailConfirmation.service';

@Module({
    imports: [ConfigModule.forRoot(), JwtModule, UserModule],
    controllers: [EmailConfirmationController],
    providers: [EmailService, EmailConfirmationService],
    exports: [EmailService, EmailConfirmationService]
})

export class EmailModule { }