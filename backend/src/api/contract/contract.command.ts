import {IsEmail, IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class ContractCommand {
    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsString()
    @IsNotEmpty()
    public address: string;

    @IsNumber()
    @IsNotEmpty()
    public premium: number;

    @IsEmail()
    public email: string;

    @IsString()
    @IsNotEmpty()
    public city: string;

    @IsString()
    @IsNotEmpty()
    public postalCode: string;

    @IsString()
    @IsNotEmpty()
    public state: string;

    @IsString()
    @IsNotEmpty()
    public housingType: string;

    @IsNumber()
    @IsNotEmpty()
    public nbRooms: number;

    @IsNumber()
    @IsNotEmpty()
    public nbFloors: number;

    @IsNumber()
    @IsNotEmpty()
    public surfaceArea: number;
}
