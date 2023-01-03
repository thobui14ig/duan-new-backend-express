import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'root';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '111111';
const MONGO_URL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@localhost:27017`;
const MONGO_DB ='asana'

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;

export const config = {
    mongo: {
        username: MONGO_USERNAME,
        password: MONGO_PASSWORD,
        url: MONGO_URL,
        db: MONGO_DB
    },
    server: {
        port: SERVER_PORT
    }
};