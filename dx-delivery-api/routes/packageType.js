const { Router } = require("express");
const authorize = require("../middlewares/authorize");

const { getAll } = require("../controllers/packageType.controller");

const router = Router();

router.get("/", authorize(), getAll);

module.exports = router;
