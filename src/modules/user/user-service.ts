import { AppDataSource } from "../../app";
import { UserEntity } from "./user.entity";

export class UserService{
    users() {
        return AppDataSource.getRepository(UserEntity).find()
    }
     

    

    getOne(id: number | string){
        return AppDataSource.getRepository(UserEntity).findOne({
            where: {
                id: Number(id)
            }
        })
    }
}