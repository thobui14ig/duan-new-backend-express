import { Request, Response } from 'express';
import UserModel from './user.model';

export class UserController{
    async findAll(req: Request, res: Response){
        try{
            const users = await UserModel.find({})
            return res.send(users)
        }catch(err){
            return res.status(500).send('LOi')
        }
        
    }
}