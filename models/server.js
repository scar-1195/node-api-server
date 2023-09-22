const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: '/api/auth',
      categories: '/api/categories',
      products: '/api/products',
      users: '/api/users',
    };

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
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.categories, require('../routes/categories'));
    this.app.use(this.paths.products, require('../routes/products'));
    this.app.use(this.paths.users, require('../routes/users'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto ${this.port}`);
    });
  }
}

module.exports = Server;
