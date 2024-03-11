const { Router } = require("express");
const { getUser, signup } = require("../controllers/user.controller");
const authorize = require("../middlewares/authorize");

const router = Router();

// Get current user
router.get("/", authorize([], true), getUser);

// Signup
router.post("/signup", authorize([], true), signup);

module.exports = router;
