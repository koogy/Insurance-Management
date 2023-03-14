import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from 'typeorm-extension';
import { MainSeeder } from "./seeds/MainSeeder";

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    database: 'poca',
    username: 'test',
    password: 'test',
    entities: ['dist/**/*.entity.{ts,js}'],
    migrations: ['dist/db/migrations/*.{ts,js}'],
    seeds: [MainSeeder],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource

