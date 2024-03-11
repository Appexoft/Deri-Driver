const Server = require("./config/server");
require("dotenv").config();

const server = new Server();
server.listen();
