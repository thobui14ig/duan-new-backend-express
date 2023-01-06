import mongoose, { Document, Schema } from 'mongoose';

export interface IUser {
    name: string;
    password: string;
    refreshToken: string
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        password: { type: String, required: true },
        refreshToken: { type: String }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const UserModel = mongoose.model<IUserModel>('Users', UserSchema);
export default UserModel;