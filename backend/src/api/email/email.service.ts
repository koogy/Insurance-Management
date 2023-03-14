import {Injectable} from '@nestjs/common';
import {createTransport} from "nodemailer";
import * as Mail from 'nodemailer/lib/mailer';
import {ConfigService} from '@nestjs/config';
import {ContractEntity} from "../contract/contract.entity";

@Injectable()
export default class EmailService {
    private nodemailerTransport: Mail;

    constructor(
        private readonly configService: ConfigService,
    ) {
        this.nodemailerTransport = createTransport({
            service: configService.get('EMAIL_SERVICE'),
            auth: {
                user: configService.get('EMAIL_USER'),
                pass: configService.get('EMAIL_PASSWORD'),
            }
        });
    }

    sendEmail(options: Mail.Options) {
        return this.nodemailerTransport.sendMail(options)
    }

    public async sendExpiringContract(contract: ContractEntity) {
        const url = (process.env.NODE_ENV && process.env.NODE_ENV === "staging") ? `frontend-insurance.s3-website.eu-west-3.amazonaws.com`: `localhost:3080`;
        let expiryDate = contract.expirationDate;

        const text = `Bonjour ${contract.name},\n
            Votre contrat arrive à son échéance le ${expiryDate.toLocaleDateString('fr')} !\n
            Pour le renouveler, il suffit de vous rendre sur votre espace personnel en allant sur le lien suivant: \n
            ${url}\n
            L'équipe WorstInsurance.`;

        return this.sendEmail({
            to: contract.email,
            subject: '[WorstInsurance] Votre contrat expire bientôt',
            text,
        })
    }
    public sendTerminatedContractConfirmation(email: string, firstname: string, lastname: string) {
        const text = `Bonjour ${firstname} ${lastname.toUpperCase()},\n
        Nous vous confirmons que votre contrat vient bien d'être résilié`;

        return this.sendEmail({
            to: email,
            subject: '[WorstInsurance] Confirmation résiliation de votre contrat',
            text,
        })
    }
}
