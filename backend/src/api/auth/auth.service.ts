import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { signInDTO, signUpDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {

  @InjectRepository(User)
  private readonly repository: Repository<User>;

  async signup(signUpDTO: signUpDTO): Promise<User> {
    const user = new User()
    user.firstName = signUpDTO.firstName
    user.lastName = signUpDTO.lastName
    user.email = signUpDTO.email
    user.password = await argon.hash(signUpDTO.password)
    user.city = signUpDTO.city
    user.phoneNumber = signUpDTO.phoneNumber
    user.address = signUpDTO.address
    user.postalCode = signUpDTO.postalCode

    try {
      return await this.repository.save(user)
    }
    catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      } else if (error.code === '409') {
        throw new ConflictException('Phone number already exists');
      }
      else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.repository.findOneBy({ email });
  }

  async signIn(signInDTO: signInDTO): Promise<Omit<User, "password">> {
    const user = await this.findOne(signInDTO.email);
    if (user && await argon.verify(user.password, signInDTO.password) && user.isEmailConfirmed) {
      const { password, ...result } = user;
      return result;
    }
    return Promise.reject('Not an user or email/password combinaison not correct');
  }
}
