/* eslint-disable no-mixed-spaces-and-tabs */
import { Request, Response } from 'express';
import UserModel from '../../models/user.model';
import { AuthService } from './auth.service';
import randToken from 'rand-token';

const jwtVariable = {
    accessTokenSecret: 'access-token-secret-example',
    accessTokenLife: '10m',
    refreshTokenSize: 100,
};

export class AuthController{
    service: AuthService;

    constructor() {
        this.service = new AuthService();
    }

    async login(req: Request, res: Response){
        const { name, password } = req.body;
        const user = await UserModel.findOne({
            name,
            password
        });

        if (!user) {
            return res.status(401).send('Tên đăng nhập không tồn tại.');
        }

        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
	    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        
        const dataForAccessToken = {
            name,
        };

        const accessToken = await this.service.generateToken(
            dataForAccessToken,
            accessTokenSecret,
            accessTokenLife,
        );

        if (!accessToken) {
            return res
                .status(401)
                .send('Đăng nhập không thành công, vui lòng thử lại.');
        }

        let refreshToken = randToken.generate(jwtVariable.refreshTokenSize);

        if (!user.refreshToken) {
            // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
            await this.service.updateRefreshToken(name, refreshToken);
        } else {
            // Nếu user này đã có refresh token thì lấy refresh token đó từ database
            refreshToken = user.refreshToken;
        }

        return res.send({
            msg: 'Đăng nhập thành công.',
            accessToken,
            refreshToken,
            user,
        });
    }

}