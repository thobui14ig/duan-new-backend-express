/* eslint-disable @typescript-eslint/no-var-requires */
import jwt from 'jsonwebtoken';
import UserModel from '../../models/user.model';
const promisify = require('util').promisify;
const sign = promisify(jwt.sign).bind(jwt);

export class AuthService{
    async generateToken(payload: any, secretSignature: any, tokenLife: any){
        try {
            return await sign(
                {
                    payload,
                },
                secretSignature,
                {
                    algorithm: 'HS256',
                    expiresIn: tokenLife,
                },
            );
        } catch (error) {
            console.log(`Error in generate access token:  + ${error}`);
            return null;
        }
    }

    async updateRefreshToken(name: string, refreshToken: string) {
        try {
            await UserModel.updateOne({ name },{
                $set: { refreshToken }
            });
            return true;
        } catch {
            return false;
        }
    }
}