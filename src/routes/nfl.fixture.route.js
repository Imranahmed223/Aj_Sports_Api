const express = require("express");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const { nflFixtureValidation } = require("../validations/");
const { nflFixtureController } = require("../controllers");
const router = express.Router();

router
  .route("/")
  .post(
    auth("manageNflFixtures"),
    validate(nflFixtureValidation.createFixture),
    nflFixtureController.createFixture
  )
  .get(
    validate(nflFixtureValidation.getAllFixtures),
    nflFixtureController.queryFixtures
  );

router
  .route("/:id")
  .get(
    validate(nflFixtureValidation.getSingleFixture),
    nflFixtureController.getSingleFixture
  )
  .patch(
    auth("manageNflFixtures"),
    validate(nflFixtureValidation.updateFixture),
    nflFixtureController.updateFixture
  )
  .delete(
    auth("manageNflFixtures"),
    validate(nflFixtureValidation.deleteFixture),
    nflFixtureController.deleteFixture
  );

module.exports = router;
