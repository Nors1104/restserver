const express = require("express")
const cors = require("cors")
const { dbConnection } = require("./databases/config")
require("dotenv").config()

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT || 3000
    this.userPath = "/api/users"
    this.authPath = "/api/auth"
    this.productPath = "/api/products"
    this.categoryPath = "/api/categories"

    this.connectDb()
    this.middlewares()
    this.routes()
  }
  middlewares() {
    this.app.use(cors())
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
    this.app.use(this.productPath, require("./routes/product"))
    this.app.use(this.categoryPath, require("./routes/category"))
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port)
    })
  }
}

module.exports = Server
