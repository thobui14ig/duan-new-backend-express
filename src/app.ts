/* eslint-disable @typescript-eslint/no-var-requires */
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import http from 'http';
import mongoose from 'mongoose';
import { config } from '../config/config';
import * as middleware from './middleware';
import { Server } from 'socket.io';
import { isAuth } from './middleware/user/isAuth.middleware';
class App {
  public app: express.Application
  public port: number | string
  public server: any
  public io: any

  constructor(controllers: any[], port: number | string) {
    this.app = express()
    this.port = port

    this.initializeMiddlewares()
    this.initializeControllers(controllers)
    this.server = http.createServer(this.app);

    const socketIo = new Server(this.server, {
      cors: {
          origin: '*',
      }
    });



    socketIo.on('connection', (socket) => {
      console.log('New client connected' + socket.id);
      // console.log("a user connected.", socket);
      // console.log(1111, socket.handshake.headers.idroom);
      // socket.id = socket.handshake.headers.idroom
      socket.emit('getId', socket.id);
    
      socket.on('addUser', (userId) => {
        // addUser(userId, socket.id);
    
        // console.log(111, users)
        // socket.emit('getUsers', users);
      });
    
      
    
      socket.on('sendDataClient', function(data) {//client gửi lên
        const { id } = data;
        socketIo.to(socket.id).emit('sendDataServer', { data }); //sever gửi xuống
      })
    
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
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
    this.server.listen(this.port, () => {
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
