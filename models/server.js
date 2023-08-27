const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users';

    //* DB
    this.DB();

    //* Middlewares
    this.middlewares();

    //* Routes
    this.routes();
  }

  async DB() {
    await dbConnection();
  }

  middlewares() {
    //? CORS
    this.app.use(cors());

    //? Read and Parse body
    this.app.use(express.json());

    //? Public directory
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.usersPath, require('../routes/users'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto ${this.port}`);
    });
  }
}

module.exports = Server;