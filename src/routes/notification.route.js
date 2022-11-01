const express = require("express");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const { notifcationValidation } = require("../validations/");
const { notificationController } = require("../controllers");
const router = express.Router();

router.get(
  "/",
  validate(notifcationValidation.queryNotifications),
  notificationController.queryNotifications
);

module.exports = router;
