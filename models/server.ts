import express, { Application, Router } from "express";
import cors from "cors";
import { dbConnection } from '../database/config';

import userRoutes from '../routes/user';

class Server {

  private app: Application
  private port?: string
  private paths: { [key: string]: Router }

  constructor() {
    this.app = express()

    this.port = process.env.PORT || '8081'

    this.paths = {
      '/api/user': userRoutes,
      // '/api/user': '../routes/user',
      // '/api/category': '../routes/category',
      // '/api/product': '../routes/product',
      // '/api/order': '../routes/order'
    }

    this.middlewares()
    this.connectDb()
    this.routes()
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.static('public'))
  }

  connectDb() {
    dbConnection()
  }

  routes() {
    for (const [uri, path] of Object.entries(this.paths)) {
      this.app.use(uri, path)
    }
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`App listening at http://localhost:${this.port}`)
    })
  }

}

export default Server;
