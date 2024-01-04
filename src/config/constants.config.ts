import dotenv from 'dotenv';

import IDatabaseConfig from './interfaces/databaseInterface';
import IAuthConfig from './interfaces/authInterface';
dotenv.config();


export const databaseConfig: IDatabaseConfig = {
    name: process.env.DATABASE_NAME || "my_database",
    password: process.env.DATABASE_PASSWORD || "",
    username: process.env.DATABASE_USERNAME || "root",
    host: process.env.DATABASE_HOST || "localhost",
    port: Number(process.env.DATABASE_PORT) || 3306,
    dialect: process.env.DATABASE_DIALECT || "mysql",
};

export const authConfig:IAuthConfig = {
    jwt_secret: process.env.JWT_SECRET || "SecretKey"
}