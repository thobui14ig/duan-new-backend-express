import dotenv from 'dotenv'
import App from './app'
import AuthRouter from './routers/auth.router'
import ChatRouter from './routers/chat.router'
import ResourceRouter from './routers/resource.router'
import UserRouter from './routers/user.router'

dotenv.config()

const port = process.env.PORT || 9000
const app = new App([
    new ResourceRouter(),
    new AuthRouter(),
    new UserRouter(),
    new ChatRouter()
], port)

app.listen()

