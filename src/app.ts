import express from 'express';
import { DataSource } from 'typeorm';
import { Router } from './routes/router';
import { UserEntity } from './modules/user/user.entity';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './libs/logging';
import cors from 'cors';
const app = express();
app.use(express.json());
const port = 9000;


export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'tho',
    synchronize: true,
    // logging: true,
    entities: [UserEntity],
    subscribers: [],
    migrations: [],
});

try{
    AppDataSource.initialize().then(() => {
        Logging.info('DB Connected!');
    }).catch((err) => Logging.error('ConnectDB sql error!'));

    mongoose
        .connect(config.mongo.url, { retryWrites: true, w: 'majority', dbName: config.mongo.db })
        .then(() => {
            Logging.info('Mongo connected successfully.');
            StartServer();
        }).catch((err) => Logging.error('ConnectDB mongo error!'));
    const StartServer = () => {

        app.use(cors());
        app.listen(port, () => {
            new Router(app);
        });


    };
}catch(err){
    console.log('DB connect err!');
}






