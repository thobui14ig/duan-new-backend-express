import { Request, Response } from "express";
import mongoose from "mongoose";
import ResourceModel from "../../models/resource.model";
const ObjectId = mongoose.Types.ObjectId;

export class ResourcesController{

    async menus(req: any, res: any){
        const data = await ResourceModel.aggregate([
            { $lookup: { from: 'resources', localField: 'projects', foreignField: '_id', as: 'projects' } },
            // {
            //     $unwind: '$createdBy' //chi tao ra object
            // },
            { "$match": { "resource_type": "team" } },
            // { $lookup: { from: 'resources', localField: 'task_id', foreignField: '_id', as: 'task' } },
            // {
            //     $unwind: '$task' //chi tao ra object
            // },

        ])
        res.send(data)

    }

    async insert(req: Request, res: Response){
        console.log(req.body)
        const { team, resource_type, project, sections } = req.body


        const resource = await ResourceModel.create({ ...req.body, createdBy: '63a6cae6d4b4cc4dde8f9098' })
        if(resource_type === 'project'){
            return ResourceModel.updateOne(
                { _id: team },
                { $push: { projects: resource._id } }
            )            
        }

        if(resource_type === 'section'){
            return ResourceModel.updateOne(
                { _id: project },
                { $push: { sections: resource._id } }
            )            
        }

        if(resource_type === 'task'){
            return ResourceModel.updateOne(
                { _id: sections[0] },
                { $push: { tasks: resource._id } }
            )            
        }


        res.send('ok')
    }

    async findAll(req: Request, res: Response) {
        const {id, resource_name: resource_type } = req.params
        const data = await ResourceModel.find({ resource_type })

        ResourceModel.aggregate([{
            $lookup: {
              from: "address",
              localField: "_id",
              foreignField: "party_id",
              as: "address"
            }
          }, {
            $unwind: {
              path: "$address",
              preserveNullAndEmptyArrays: true
            }
          }, {
            $lookup: {
              from: "addressComment",
              localField: "address._id",
              foreignField: "address_id",
              as: "address.addressComment",
            }
          }, {
            $group: {
              _id : "$_id",
              name: { $first: "$name" },
              address: { $push: "$address" }
            }
          }, {
            $project: {
              _id: 1,
              name: 1,
              address: {
                $filter: { input: "$address", as: "a", cond: { $ifNull: ["$$a._id", false] } }
              } 
            }
        }]);
        res.send(data)
    }

    async getTeams(req: Request, res: Response) {
        const { id } = req.params
        const data = await ResourceModel.aggregate([{ 
            $lookup: { 
                from: 'resources', 
                // let: {  },
                localField: 'projects', 
                foreignField: '_id', 
                as: 'projects', 
            } 
        },
        { "$match": { "_id": new ObjectId(id) } },
        ])
        res.send(data[0])
    }

    async getProjects(req: Request, res: Response) {
        const { id } = req.params
        const data = await ResourceModel.aggregate([
            { $lookup: { from: 'resources', localField: 'sections', foreignField: '_id', as: 'sections' } },
            { "$match": { "_id": new ObjectId(id) } },
        ])
        res.send(data[0])
    }

}
