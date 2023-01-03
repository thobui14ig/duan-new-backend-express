import { Request, Response } from "express";
import mongoose from "mongoose";
import UserModel from "../../models/user.model";

export class AuthController{

    async login(req: any, res: any){
        const data = req.body
        const user = await UserModel.findOne({username: data.username, password: data.password})
        if (user) {
            res.send({status: 200, message: 'success'})
        }else {
            res.send({status: 500, message: 'user not found'})
        }
    }

}