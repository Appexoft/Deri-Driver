const { Router } = require("express");
const { listRiders } = require("../controllers/rider.controller");
const authorize = require("../middlewares/authorize");
const { roles } = require("../helpers/constants");

const router = Router();

// List all riders
router.get("/list", authorize(roles.ADMIN), listRiders);

module.exports = router;
