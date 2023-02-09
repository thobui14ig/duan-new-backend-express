import { isAuth } from './middleware/user/isAuth.middleware';
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'
import { config } from '../config/config'
import * as middleware from './middleware'

class App {
  public app: express.Application
  public port: number | string

  constructor(controllers: any[], port: number | string) {
    this.app = express()
    this.port = port

    this.initializeMiddlewares()
    this.initializeControllers(controllers)
  }

  private initializeMiddlewares() {
    this.app.use(helmet())

    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(middleware.httpLogger)
    this.app.use(isAuth)
  }

  private initializeControllers(controllers: any[]) {
    this.app.get('/', (request, response) => {
      response.send('Application is running')
    })
    controllers.forEach((controller) => {
      this.app.use(controller.path, controller.router)
    })
    
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`)
    })

    mongoose
        .connect(config.mongo.url, { retryWrites: true, w: 'majority', dbName: config.mongo.db })
        .then(() => {
            console.log('Mongo connected successfully.')
        }).catch((err) => console.log('ConnectDB mongo error!', err))
  }
}

export default App
