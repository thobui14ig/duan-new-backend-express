import mongoose, { Document, Schema } from 'mongoose'

export interface IMessage {
    content: string;
    createdBy: string;
    room: string;
}

export interface IMessageModel extends IMessage, Document {}

const MessageSchema: Schema = new Schema(
    {
        content: { type: String, required: true },
        createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'Users'},
        room: { type: Schema.Types.ObjectId, required: true, ref: 'Resources',  },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const MessageModel = mongoose.model<IMessageModel>('Messages', MessageSchema)
export default MessageModel