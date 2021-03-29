import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig = () => {
  const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.PG_DB_HOST || '127.0.0.1',
    port: parseInt(process.env.PG_DB_PORT, 10) || 5432,
    username: process.env.PG_DB_USERNAME || '',
    password: process.env.PG_DB_PASSWORD || '',
    database: process.env.PG_DB_NAME || 'test',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    ssl: {
      rejectUnauthorized: false,
    },
  };
  return typeOrmConfig;
};
