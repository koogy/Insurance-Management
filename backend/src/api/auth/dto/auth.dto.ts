
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class signUpDTO {
    @IsString()
    @IsNotEmpty()
    public firstName: string;

    @IsString()
    @IsNotEmpty()
    public lastName: string;

    @IsEmail()
    public email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber('FR')
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    postalCode: string;
}

export class signInDTO {
    @IsEmail()
    public email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
