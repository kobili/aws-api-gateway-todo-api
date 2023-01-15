import { Client } from 'ts-postgres';

require('dotenv').config();

export const pgClient = new Client({
    host: process.env.PG_URL,
    port: parseInt(process.env.PG_PORT!),
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD
});