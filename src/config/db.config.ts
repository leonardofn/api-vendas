import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'apivendas',
  entities: ['./src/modules/**/entities/*.ts'],
  migrations: ['./src/shared/typeorm/migrations/*.ts'],
  synchronize: false,
});
