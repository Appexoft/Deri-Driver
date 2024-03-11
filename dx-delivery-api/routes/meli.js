const { Router } = require("express");
const {
  authenticate,
  notifications,
  getAuthUrl,
  meliAddShipping,
} = require("../controllers/meli.controller");
const { sendDataToNotificationQueue } = require("../helpers/notification");
const authorize = require("../middlewares/authorize");

const router = Router();

router.get("/", authenticate);

router.post("/notifications", notifications);

router.get("/getAuthUrl", authorize(), getAuthUrl);

router.post("/processNotification", meliAddShipping);

router.post("/sendNotification", sendDataToNotificationQueue);

module.exports = router;
