import mongoose, { Document, Schema } from 'mongoose'

export interface IChat {
    users: string[];
    messages: string[];
}

export interface IChatModel extends IChat, Document {}

const ChatSchema: Schema = new Schema(
    {
        users: { type: [Schema.Types.ObjectId], ref: 'Users', default: undefined },
        messages: { type: [Schema.Types.ObjectId], ref: 'Messages', default: undefined },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const ChatModel = mongoose.model<IChatModel>('Chats', ChatSchema)
export default ChatModel