import mongoose, { Document, Schema } from 'mongoose';

export interface IUser {
    title: string;
    author: string;
}

export interface IUserModel extends IUser, Document {}
let id = new mongoose.Types.ObjectId()

const BookSchema: Schema = new Schema(
    {
        // _id: { type: String },
        email: { type: String, required: true },
        // author: { type: Schema.Types.ObjectId, required: true, ref: 'Author' }
        name: { type: String }
    },
    {
        timestamps: true,
        versionKey: false,
        // _id: true
    }
);

const UserModel = mongoose.model<IUserModel>('Users', BookSchema);
export default UserModel