import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
const dbconfig = config.get('db');

export const typeOrmConfig = () => {
  const typeOrmConfig: TypeOrmModuleOptions = {
    type: dbconfig.type,
    host: process.env.PG_DB_HOST || dbconfig.host,
    port: parseInt(process.env.PG_DB_PORT, 10) || dbconfig.port,
    username: process.env.PG_DB_USERNAME || dbconfig.username,
    password: process.env.PG_DB_PASSWORD || dbconfig.password,
    database: process.env.PG_DB_NAME || dbconfig.database,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: dbconfig.synchronize,
    ssl: {
      rejectUnauthorized: false,
    },
  };
  return typeOrmConfig;
};
