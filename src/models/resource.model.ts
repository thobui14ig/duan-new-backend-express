import mongoose, { Document, Schema } from 'mongoose';

export interface IResource {
    name: string;
    createdBy: string;
    resource_type : String,
    team: String,
    task: String,
    projects: String[],
    project: String,
    sections: String[]
}

export interface ResourceModel extends IResource, Document {}


const ResourcesSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'Users',  },
        resource_type: { type: String },
        task_id: { type: Schema.Types.ObjectId, ref: 'Resources' },
        team: { type: Schema.Types.ObjectId, ref: 'Resources' },
        projects: { type: [Schema.Types.ObjectId], ref: 'Resources', default: undefined },
        project: { type: Schema.Types.ObjectId, ref: 'Resources' },
        sections: { type: [Schema.Types.ObjectId], ref: 'Resources', default: undefined },
        tasks: { type: [Schema.Types.ObjectId], ref: 'Resources', default: undefined },
    },
    {
        timestamps: true,
        versionKey: false,
        // _id: true
    }
);

const ResourceModel = mongoose.model<ResourceModel>('Resources', ResourcesSchema);
export default ResourceModel