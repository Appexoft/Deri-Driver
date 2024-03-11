const { Router } = require("express");
const authorize = require("../middlewares/authorize");
const { authenticate } = require("../controllers/auth.controller");
const router = Router();

// Test
router.post("/test", authorize(), authenticate);

module.exports = router;
