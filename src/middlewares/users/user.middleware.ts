import { NextFunction, Request, Response } from "express"

export default function checkUser1(req: Request, res: Response, next: NextFunction){
    try{
        const { id } = req.params
        if(Number(id) === 1){
            throw new Error('Ban chua dc phan quyen!')
        }
        next()
        
        // next()
    }catch(err){
        next(err)
    }

}

