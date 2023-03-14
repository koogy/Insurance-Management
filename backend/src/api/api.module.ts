import {Module} from '@nestjs/common';
import {QuoteModule} from './quote/quote.module';
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';
import {EmailModule} from "./email/email.module";
import {ContractModule} from "./contract/contract.module";


@Module({
    imports: [QuoteModule, UserModule, AuthModule, EmailModule, ContractModule],
})
export class ApiModule {
}
