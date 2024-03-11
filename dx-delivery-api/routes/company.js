const { Router } = require("express");
const authorize = require("../middlewares/authorize");
const { listCompanies } = require("../controllers/company.controller");

const router = Router();

// List companies
router.get("/list", authorize([], true), listCompanies);

module.exports = router;
