import express from 'express';
import { AuthController } from '../modules/auth/auth.controller';

const router = express.Router();

export class Auth{
    constructor(app: any){
        const controller = new AuthController();
        router.post('/login', (req, res) => controller.login(req, res));
        app.use('/auth', router);
    }
}