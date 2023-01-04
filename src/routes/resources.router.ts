
import express from 'express';
import { ResourcesController } from '../modules/resources/resources.controller';
const router = express.Router();

export class Resources{
    constructor(app: any){
        const controller = new ResourcesController();
        // router.get('/', controller.index)
        router.get('/menus', controller.menus);
        router.get('/team/:id', controller.getTeams);
        router.get('/project/:id', controller.getProjects);
        router.post('/insert', controller.insert);
        app.use('/resources', router);
    }
}