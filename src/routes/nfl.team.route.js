const express = require("express");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const { nflTeamsValidation } = require("../validations/");
const { nflTeamController } = require("../controllers");
const { fileUpload } = require("../utils/fileUpload");
const router = express.Router();

router
  .route("/")
  .post(
    auth("manageNflTeams"),
    fileUpload.single("logo"),
    validate(nflTeamsValidation.createTeam),
    nflTeamController.createTeam
  )
  .get(validate(nflTeamsValidation.getAllTeams), nflTeamController.queryTeams);

router
  .route("/:id")
  .get(
    validate(nflTeamsValidation.getSingleTeam),
    nflTeamController.getSingleTeam
  )
  .patch(
    auth("manageNflTeams"),
    fileUpload.single("logo"),
    validate(nflTeamsValidation.updateTeam),
    nflTeamController.updateTeam
  )
  .delete(
    auth("manageNflTeams"),
    validate(nflTeamsValidation.deleteTeam),
    nflTeamController.deleteTeam
  );

module.exports = router;
