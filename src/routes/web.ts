
import express from 'express';
import checkUser1 from '../middlewares/users/user.middleware';
import { UserController } from '../modules/user/user.controller';
const router = express.Router();

export class Web{
    constructor(app: any){
        const controller = new UserController();

        router.get('/', (req, res) => controller.index(req, res));
        router.get('/:id', checkUser1, (req, res) => controller.getOne(req, res));
        app.use('/user', router);
        app.use(errorHandler);
    }
}

const errorHandler = (error: any, request: any, response: any, next: any) => {
    // Error handling middleware functionality
    console.log( `error ${error.message}`); // log the error
    const status = error.status || 400;
    // send back an easily understandable error message to the caller
    response.status(status).send(error.message);
};
