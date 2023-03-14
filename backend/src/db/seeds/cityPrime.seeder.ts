import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { CityPrime } from 'src/api/quote/cityPrime.entity';

export class CityPrimeSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
    ): Promise<any> {
        const repository = dataSource.getRepository(CityPrime);
        await repository.insert([
            {
                city: 'Paris',
                value: 10
            }
        ]);

        await repository.insert([
            {
                city: 'Lyon',
                value: 10
            }
        ]);

        await repository.insert([
            {
                city: 'Marseille',
                value: 10
            }
        ]);


    }
}