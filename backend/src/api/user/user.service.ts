import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Repository} from "typeorm";
import {User} from "./entities/user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {
    }

    async markEmailConfirmed(email: string): Promise<User> {
        return await this.userRepository.save({
            email,
            isEmailConfirmed: true
        });
    }

    async getByEmail(email: string): Promise<User> {
        return await this.userRepository.findOneBy({ email });
    }

    public async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    public async delete(id: number): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    }
}
