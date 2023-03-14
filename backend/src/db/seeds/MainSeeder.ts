import { DataSource } from 'typeorm';
import { runSeeder, Seeder, SeederFactoryManager } from 'typeorm-extension';
import { CityPrimeSeeder } from './cityPrime.seeder';
import { UserSeeder } from './user.seeder'
export class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await runSeeder(dataSource, UserSeeder);
    await runSeeder(dataSource, CityPrimeSeeder);
    // don't forget to add seeders here
  }
}
