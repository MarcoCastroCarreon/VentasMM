import { createConnection } from 'typeorm';

const port: number = +process.env.DB_PORT;
const host: string = process.env.DB_HOST;
const database: string = process.env.DB_SCHEMA;
const username: string = process.env.DB_USERNAME;
const password: string = process.env.DB_PWD;

export async function initConnection() {
    console.info('Starting Connection.......');
    await createConnection({
        type: 'mysql',
        port,
        host,
        database,
        username,
        password,
        supportBigNumbers: true,
        bigNumberStrings: true
    }).then(conn => console.log('Connection Connected ==> ', conn.isConnected));
}