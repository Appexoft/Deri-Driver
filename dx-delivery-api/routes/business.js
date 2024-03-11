const { Router } = require("express");
const authorize = require("../middlewares/authorize");
const { updateBusiness } = require("../controllers/business.controller");

const router = Router();

// Update Business
router.put("/", authorize(), updateBusiness);

module.exports = router;
