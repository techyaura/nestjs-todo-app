import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig = () => {
  const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: 'sql_demo',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
  };
  return typeOrmConfig;
};
