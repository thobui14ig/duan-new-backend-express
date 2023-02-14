import { AuthController } from '../modules/auth/auth.controller'
import { BaseRouter } from './resource.router'

export default class AuthRouter extends BaseRouter {
  public path = '/auth'
  controller: AuthController

  constructor() {
    super()
    this.controller = new AuthController()
    
    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.router.post('/login', (req, res) => this.controller.login(req, res))
    this.router.post('/refresh', (req, res) => this.controller.refreshToken(req, res))
    
  }
}
  