import {IsEmail, IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class AccidentCommand {
    @IsString()
    @IsNotEmpty()
    public accidentType: string;

    @IsNumber()
    @IsNotEmpty()
    public contractId: number;
}
