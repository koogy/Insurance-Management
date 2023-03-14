import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from 'src/api/user/entities/user.entity';
import * as argon from 'argon2';

export class UserSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const repository = dataSource.getRepository(User);
        await repository.insert([
            {
                firstName: 'Admin',
                lastName: 'Compte',
                email: 'admin@admin.com',
                password: await argon.hash("admin123"),
                city: 'AdminLand',
                phoneNumber: '0123456799',
                isEmailConfirmed: true,
                isAdmin: true
            }
        ]);


    }
}