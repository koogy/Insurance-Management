import {IsEmail, IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class CreateQuoteCommand {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public address: string;

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
  public housingType: string;

  @IsString()
  @IsNotEmpty()
  public nbRooms: string;

  @IsString()
  @IsNotEmpty()
  public nbFloors: string;

  @IsString()
  @IsNotEmpty()
  public surfaceArea: string;
}
