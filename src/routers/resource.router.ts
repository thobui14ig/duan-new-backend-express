import { ResourcesController } from '../modules/resources/resource.controller'
import express from 'express'

export abstract class BaseRouter {
    public app: express.Application
    public router: express.Router
  
    constructor() {
      this.app = express()
      this.router = express.Router()
    }
  
    public abstract initializeRoutes(): void;
  }
export default class ResourceRouter extends BaseRouter {
  public path = '/resources'
  controller: ResourcesController

  constructor() {
    super()
    this.controller = new ResourcesController()
    
    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.router.get('/menus', (req, res) => this.controller.menus(req, res))
    this.router.get('/team/:id', (req, res) => this.controller.getTeams(req, res))
    this.router.get('/task/:id', (req, res) => this.controller.getTask(req, res))
    this.router.get('/project/:id', (req, res) =>this.controller.getProjects(req, res))
    this.router.post('/insert', (req, res) => this.controller.insert(req, res))
    this.router.get('/', (req, res) => this.controller.upload(req, res))
    
  }
}
  