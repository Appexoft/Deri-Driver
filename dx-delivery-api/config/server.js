const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const favicon = require("serve-favicon");
const path = require("path");

const AdminBro = require("adminjs");

const options = require("../admin/admin.options");
const buildAdminRouter = require("../admin/admin.router");

const { dbConnection } = require("./dbConnection");
class Server {
  constructor() {
    this.app = express();
    // eslint-disable-next-line no-undef
    this.port = process.env.PORT;
    // eslint-disable-next-line no-undef
    this.app.use(favicon(path.join(__dirname, "../public", "favicon.ico")));

    this.paths = {
      auth: "/api/auth",
      meli: "/api/meli",
      shipping: "/api/shipping",
      rider: "/api/rider",
      client: "/api/client",
      user: "/api/user",
      business: "/api/business",
      packageType: "/api/package-type",
      company: "/api/company",
    };

    // DB connection
    this.connectDB();

    this.adminBro = new AdminBro(options);
    this.router = buildAdminRouter(this.adminBro);

    this.app.use(this.adminBro.options.rootPath, this.router);

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Parse body
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    //HTTP logger
    this.app.use(logger("dev"));

    // Public
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.meli, require("../routes/meli"));
    this.app.use(this.paths.shipping, require("../routes/shipping"));
    this.app.use(this.paths.rider, require("../routes/rider"));
    this.app.use(this.paths.client, require("../routes/client"));
    this.app.use(this.paths.user, require("../routes/user"));
    this.app.use(this.paths.business, require("../routes/business"));
    this.app.use(this.paths.packageType, require("../routes/packageType"));
    this.app.use(this.paths.company, require("../routes/company"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on", this.port);
    });
  }
}

module.exports = Server;
