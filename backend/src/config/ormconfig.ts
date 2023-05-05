import 'dotenv/config';
import { DataSource } from 'typeorm';
import { env } from 'process';

export const dataSource: DataSource = new DataSource({
    type: 'mysql',
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT),
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    entities: [
        `${__dirname}/../auth/**/*.entity{.ts,.js}`,
        `${__dirname}/../api/direct-volunteer/**/*.entity{.ts,.js}`,
        __dirname + '/../api/file/**/*.entity{.ts,.js}',
        __dirname + '/../api/provider/**/*.entity{.ts,.js}',
    ],
    migrations: [`${__dirname}/../migrations/**/*{.ts,.js}`],
    synchronize: false,
    migrationsRun: false,
    logging: false,
    migrationsTableName: 'migrations',
    metadataTableName: 'orm_metadata'
});