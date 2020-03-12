import 'reflect-metadata';
import { createConnection, getConnection } from 'typeorm';
import User from '../persistence/entitites/user.entity';
import UserProperties from '../persistence/entitites/userproperties.entity';
import CatCountry from '../persistence/entitites/cat-country.entity';

const port: number = +process.env.DB_PORT;
const host: string = process.env.DB_HOST;
const database: string = process.env.DB_SCHEMA;
const username: string = process.env.DB_USERNAME;
const password: string = process.env.DB_PASSWORD;
const entities: any[] = [User, UserProperties, CatCountry];

export async function initConnection() {
    console.info('Starting Connection.......');
    console.log(password);
    await createConnection({
        type: 'mysql',
        port,
        host,
        database,
        username,
        password,
        entities,
        synchronize: false,
        supportBigNumbers: true,
        bigNumberStrings: true
    }).then(conn => console.log('Connection Connected ==> ', conn.isConnected)).catch(async err => await getConnection())
}