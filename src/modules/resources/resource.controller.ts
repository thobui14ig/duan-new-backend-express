import { Request, Response } from 'express'
import mongoose from 'mongoose'
import GoogleApi from '../../libs/googleApi'
import ResourceModel from './resource.model'

const ObjectId = mongoose.Types.ObjectId

export class ResourcesController{

    async menus(req: Request, res: Response){
        
        const data = await ResourceModel.aggregate([
            { $lookup: { from: 'resources', localField: 'projects', foreignField: '_id', as: 'projects' } },
            // {
            //     $unwind: '$createdBy' //chi tao ra object
            // },
            { '$match': { 'resource_type': 'team' } },
            // { $lookup: { from: 'resources', localField: 'task_id', foreignField: '_id', as: 'task' } },
            // {
            //     $unwind: '$task' //chi tao ra object
            // },

        ])
        res.send(data)
    }

    async insert(req: Request | any, res: Response){
        const { team, resource_type, project, sections, task } = req.body
        try{
            const resource = await ResourceModel.create({ ...req.body, createdBy: req?.['user']._id })
            if(resource_type === 'project'){
                await ResourceModel.updateOne(
                    { _id: team },
                    { $push: { projects: resource._id } }
                )            
            }
    
            if(resource_type === 'section'){
                await ResourceModel.updateOne(
                    { _id: project },
                    { $push: { sections: resource._id } }
                )            
            }
    
            if(resource_type === 'task'){
                await ResourceModel.updateOne(
                    { _id: sections[0] },
                    { $push: { tasks: resource._id } }
                )            
            }
    
            if(resource_type === 'comment'){
                await ResourceModel.updateOne(
                    { _id: task },
                    { $push: { comments: resource._id } }
                )            
            }
    
            res.send(resource)
        }catch(err){
            res.status(500).send('Loi')
        }

    }

    async getTeams(req: Request, res: Response) {
        const { id } = req.params
        const data = await ResourceModel.aggregate([{ 
            $lookup: { 
                from: 'resources', 
                localField: 'projects', 
                foreignField: '_id', 
                as: 'projects', 
            } 
        },
        { '$match': { '_id': new ObjectId(id) } },
        ])
        res.send(data[0])
    }

    async getProjects(req: Request, res: Response) {
        const { id } = req.params
        const data = await ResourceModel.aggregate([
            { $lookup: { 
                from: 'resources', 
                localField: 'sections', 
                foreignField: '_id', 
                as: 'sections',
                pipeline: [
                    { $lookup: {
                        from: 'resources',
                        foreignField: '_id',
                        localField: 'tasks', 
                        as: 'tasks'
                    }}
                ]
            } 
            },
            { '$match': { '_id': new ObjectId(id) } },
        ])
        res.send(data[0])
    }

    async getTask(req: Request, res: Response) {
        const { id } = req.params
        const task = await ResourceModel.aggregate([{ 
            $lookup: { 
                from: 'resources', 
                localField: 'comments', 
                foreignField: '_id', 
                as: 'comments', 
                pipeline: [
                    { $lookup: {
                        from: 'users',
                        foreignField: '_id',
                        localField: 'createdBy', 
                        as: 'createdBy'
                    }},
                    {
                        $unwind: '$createdBy' //chi tao ra object
                    }
                ]
            } 
        },{ 
            $lookup: { 
                from: 'users', 
                localField: 'createdBy', 
                foreignField: '_id', 
                as: 'createdBy', 
            } 
        }, 
        {
            $unwind: '$createdBy' //chi tao ra object
        },
        { '$match': { '_id': new ObjectId(id) } },
        ])

        res.send(task[0])
    }

    async upload(req: Request, res: Response){
        const googleApi = new GoogleApi()
        await googleApi.uploadFile()
        res.send('ok')
    }

}
