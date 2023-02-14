import { UserController } from './../modules/users/user.controller';
import { BaseRouter } from './resource.router';

export default class UserRouter extends BaseRouter {
  public path = '/users'
  controller: UserController

  constructor() {
    super()
    this.controller = new UserController()
    
    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.router.get('/', (req, res) => this.controller.findAll(req, res))
    
  }
}