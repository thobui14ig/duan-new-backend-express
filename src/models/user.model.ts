import mongoose, { Document, Schema } from 'mongoose';

export interface IUser {
    username: string;
    password: string;
}

export interface IUserModel extends IUser, Document {}
let id = new mongoose.Types.ObjectId()

const BookSchema: Schema = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const UserModel = mongoose.model<IUserModel>('Users', BookSchema);
export default UserModel