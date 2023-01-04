import { Request, Response } from 'express';
import UserModel from '../../models/user.model';
import { UserService } from './user.service';

export class UserController{
    resourceService: any;
    userService: UserService;
    constructor(){
        this.userService = new UserService();
    }

    async index(req: Request, res: Response){
        const book = new UserModel({
            // _id: new mongoose.Types.ObjectId(),
            email: 'buithanhtho15ig@gmail.com',
            name: 'thobui1'
        });
    
        return book
            .save()
            .then((book) => res.status(201).json({ book }))
            .catch((error) => res.status(500).json({ error }));

        // res.send('okkk')
    }


    async getOne(req: Request, res: Response){
        const { id } = req.params;
        const data = await this.userService.getOne(id);
        res.send(data);
    }
}
