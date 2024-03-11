const { Router } = require("express");
const authorize = require("../middlewares/authorize");
const { roles } = require("../helpers/constants");
const { listClients } = require("../controllers/client.controller");

const router = Router();

// List clients
router.get("/list", authorize(roles.ADMIN), listClients);

module.exports = router;
