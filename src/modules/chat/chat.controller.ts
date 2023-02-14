import { Request, Response } from 'express';

export class ChatController{
    async findAll(req: Request, res: Response){
        return res.send('ok')
        
    }

    getCurrentChat(req: Request | any, res: Response){
        const { params, user } = req;
        const { id } = params;
        console.log(111, id)
        console.log(111, user._id.toString())


        return res.send('ok')
    }
}