import { Client } from 'ts-postgres';

export const pgClient = new Client({
    host: '<DATABASE_URL>',
    port: <DATABASE_PORT>,
    database: '<DATABASE_NAME>',
    user: '<DATABASE_USERNAME>',
    password: '<DATABASE_PASSWORD>'
});