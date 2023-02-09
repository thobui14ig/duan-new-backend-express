import { NextFunction, Request, Response } from 'express'
import UserModel from '../../modules/users/user.model'
import { AuthService } from '../../modules/auth/auth.service'

export const isAuth = async(req: Request | any, res: Response, next: NextFunction) => {
    const service = new AuthService()
    // Lấy access token từ header
    const accessTokenFromHeader = req.headers.x_authorization
    if (!accessTokenFromHeader) {
        return res.status(401).send('Không tìm thấy access token!')
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

    const verified = await service.verifyToken(
        accessTokenFromHeader as string,
        accessTokenSecret,
    )
    if (!verified) {
        return res
            .status(401)
            .send('Bạn không có quyền truy cập vào tính năng này!')
    }

    const user = await UserModel.findOne({
        name: verified.payload.name
    })
    
    req['user'] = user

    return next()
}