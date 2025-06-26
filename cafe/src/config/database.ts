import { DataSource } from 'typeorm';
import { User } from '../models/User';
import { Cafe } from '../models/Cafe';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [User, Cafe],
  migrations: [],
  subscribers: [],
});

