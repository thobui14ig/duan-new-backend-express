
import express from 'express';
import { isAuth } from '../modules/auth/middlewares/isAuth.middleware';
import { ResourcesController } from '../modules/resources/resources.controller';
const router = express.Router();

export class Resources{
    constructor(app: any){
        const controller = new ResourcesController();
        router.get('/menus', controller.menus);
        // router.get('/menus', isAuth, controller.menus);
        router.get('/team/:id', controller.getTeams);
        router.get('/task/:id', controller.getTask);
        router.get('/project/:id', controller.getProjects);
        router.post('/insert', controller.insert);
        app.use('/resources', router);
    }
}