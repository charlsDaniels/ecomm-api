const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {

  constructor() {
    this.app = express()

    this.paths = {
      '/auth': '../routes/auth',
      '/api/user': '../routes/user',
      '/api/category': '../routes/category',
      '/api/product': '../routes/product'
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
      this.app.use(uri, require(path))
    }
  }

  start() {
    const port = process.env.PORT || 8081

    this.app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`)
    })
  }

}

module.exports = Server