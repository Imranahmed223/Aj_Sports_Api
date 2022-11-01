const express = require("express");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const { boxingPlayersValidation } = require("../validations/");
const { boxingPlayersController } = require("../controllers");
const { fileUpload } = require("../utils/fileUpload");
const router = express.Router();

router
  .route("/")
  .post(
    auth("manageBoxingPlayers"),
    fileUpload.single("logo"),
    validate(boxingPlayersValidation.createPlayer),
    boxingPlayersController.createPlayer
  )
  .get(
    validate(boxingPlayersValidation.queryPlayes),
    boxingPlayersController.queryPlayers
  );

router
  .route("/:id")
  .get(
    validate(boxingPlayersValidation.getSinglePlayer),
    boxingPlayersController.getSinglePlayer
  )
  .patch(
    auth("manageBoxingPlayers"),
    fileUpload.single("logo"),
    validate(boxingPlayersValidation.updatePlayer),
    boxingPlayersController.updatePlayer
  )
  .delete(
    auth("manageBoxingPlayers"),
    validate(boxingPlayersValidation.deletePlayer),
    boxingPlayersController.deletePlayer
  );

module.exports = router;
