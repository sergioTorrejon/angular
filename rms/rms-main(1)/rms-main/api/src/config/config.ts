import * as dotenv from 'dotenv';

dotenv.config();

export const CONFIG_ENV = {
    SERVER_ENV : process.env.SERVER_ENV || 'prod', // AMBIENTE DE EJECUCION
    SERVER_PORT : process.env.SERVER_PORT || 3000, // PUERTO SERVIDOR
    JWT_SECRET : process.env.JWT_SECRET || 'mysecret', // KEY SECRET
    PATH_ROOT : process.env.PATH_ROOT || process.cwd(), // PATH ROOT STORAGE
};

export const DATABASE_CONFIG = {
    ssl: false,
    type:  process.env.DATABASE_TYPE || '',
    host: process.env.DATABASE_HOST || '',
    username: process.env.DATABASE_USERNAME || '',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || '',
    port: +process.env.DATABASE_PORT || '',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    logging: false,
    autoLoadEntities: true,
    synchronize:true
    //synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  };