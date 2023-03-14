import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuoteController } from './front/quote.controller';
import { getEnvPath } from './common/helper/env.helper';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { QuoteModule } from './api/quote/quote.module';
import { SignupController } from "./front/signup.controller";
import { SigninController } from './front/signin.controller';
import { HomeController } from './front/home.controller';
import { AuthModule } from './api/auth/auth.module';
import * as Joi from "joi";
import { ContractModule } from './api/contract/contract.module';
import { ContractApi } from './api/contract/contract.api';
import { EmailModule } from './api/email/email.module';
import { UserModule } from './api/user/user.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailConfirmationController } from './api/email/emailConfirmation.controller';
import { AccidentAPI } from './api/accident/accident.api';
import { AccidentModule } from './api/accident/accident.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath, isGlobal: true,
      validationSchema: Joi.object({
        JWT_VERIFICATION_TOKEN_SECRET: Joi.string().required(),
        JWT_VERIFICATION_TOKEN_EXPIRATION_TIME: Joi.string().required(),
      })
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    QuoteModule,
    AuthModule,
    ContractModule,
    EmailModule,
    ScheduleModule.forRoot(),
    UserModule,
    AccidentModule,
  ],
  controllers: [
    QuoteController,
    SigninController,
    SignupController,
    HomeController,
    ContractApi,
    EmailConfirmationController,
    AccidentAPI,
  ],
  providers: [],
})
export class AppModule { }
