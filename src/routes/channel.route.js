const express = require("express");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const { channelValidation } = require("../validations/");
const { channelController } = require("../controllers");
const router = express.Router();

router
  .route("/")
  .post(
    auth("manageChannels"),
    validate(channelValidation.createChannel),
    channelController.createChannel
  )
  .get(
    validate(channelValidation.queryChannels),
    channelController.queryChannels
  );

router
  .route("/:id")
  .get(
    validate(channelValidation.getSingleChannelById),
    channelController.getChannelById
  )
  .patch(
    auth("manageChannels"),
    validate(channelValidation.updateChannel),
    channelController.updateChannel
  )
  .delete(
    auth("manageChannels"),
    validate(channelValidation.deleteChannel),
    channelController.deleteChannel
  );
module.exports = router;
