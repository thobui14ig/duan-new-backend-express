import { Request, Response } from 'express';
import UserModel from '../../models/user.model';

export class AuthController{

    async login(req: Request, res: Response){
        const data = req.body;
        const user = await UserModel.findOne({username: data.username, password: data.password});
        if (user) {
            res.send({status: 200, message: 'success'});
        }else {
            res.send({status: 500, message: 'user not found'});
        }
    }

}