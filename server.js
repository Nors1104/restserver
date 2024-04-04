const express = require("express")
const { dbConnection } = require("./databases/config")
require("dotenv").config()

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT || 3000
    this.userPath = "/api/users"
    this.authPath = "/api/auth"

    this.connectDb()
    this.middlewares()
    this.routes()
  }
  middlewares() {
    this.app.use(express.json())
    this.app.use(express.static("public"))
  }
  connectDb() {
    dbConnection()
  }
  routes() {
    // this.app.get("/api", function (req, res) {
    //   res.send("hello")
    // })
    this.app.use(this.authPath, require("./routes/auth"))
    this.app.use(this.userPath, require("./routes/user"))
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port)
    })
  }
}

module.exports = Server
