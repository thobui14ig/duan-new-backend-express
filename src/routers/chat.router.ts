import { ChatController } from './../modules/chat/chat.controller';
import { BaseRouter } from './resource.router';

export default class ChatRouter extends BaseRouter {
  public path = '/chat'
  controller: ChatController

  constructor() {
    super()
    this.controller = new ChatController()
    
    this.initializeRoutes()
  }

  public initializeRoutes() {
    this.router.get('/', (req, res) => this.controller.findAll(req, res))
    this.router.get('/:id', (req, res) => this.controller.getCurrentChat(req, res))
  }
}