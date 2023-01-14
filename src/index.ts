import dotenv from 'dotenv'
import App from './app'
import AuthRouter from './routers/auth.router'
import ResourceRouter from './routers/resource.router'

dotenv.config()

const port = process.env.PORT || 9000
const app = new App([
    new ResourceRouter(),
    new AuthRouter(),
], port)

app.listen()

