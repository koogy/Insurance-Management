import {BadRequestException, Inject, Injectable, Logger} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import EmailService from "./email.service";
import VerificationTokenPayload from './verificationTokenPayload.interface';
import {UserService} from "../user/user.service";

@Injectable()
export class EmailConfirmationService {
    @Inject(ConfigService)
    private readonly configService: ConfigService;
    constructor(
        private readonly jwtService: JwtService,
        private readonly emailService: EmailService,
        private readonly userService: UserService,
    ) {
    }

    public sendVerificationLink(email: string, firstname: string, lastname: string) {

        const payload: VerificationTokenPayload = { email };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
            expiresIn: `${this.configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`
        });

        let url;
        if (process.env.NODE_ENV && process.env.NODE_ENV === "staging") {
            url = `frontend-insurance.s3-website.eu-west-3.amazonaws.com/emailConfirmation/${token}`;
        }
        else {
            url = `localhost:3080/emailConfirmation/${token}`;
        } 
        const text = `Bonjour ${firstname} ${lastname.toUpperCase()},\n
        Bienvenue chez WorstInsurance !\n
        Veuillez confirmer votre inscription: ${url}`;

        return this.emailService.sendEmail({
            to: email,
            subject: '[WorstInsurance] Confirmation d\'inscription',
            text,
        })

    }

    public async confirmEmail(email: string) {
        const user = await this.userService.getByEmail(email);
        Logger.log(user.isEmailConfirmed);
        if (user.isEmailConfirmed) {
            throw new BadRequestException('Email already confirmed');
        }
        await this.userService.markEmailConfirmed(email);
        user.isEmailConfirmed = true;
        const { password, ...result } = user;
        return result;
    }

    public async decodeConfirmationToken(token: string) {
        try {
            const payload = await this.jwtService.verify(token, {
                secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
            });

            if (typeof payload === 'object' && 'email' in payload) {
                return payload.email;
            }
            throw new BadRequestException();
        } catch (error) {
            if (error?.name === 'TokenExpiredError') {
                throw new BadRequestException('Email confirmation token expired');
            }
            throw new BadRequestException('Bad confirmation token');
        }
    }
}