const express = require("express");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const { boxingFixtureValidation } = require("../validations/");
const { boxingFixtureController } = require("../controllers");
const router = express.Router();

router
  .route("/fixture")
  .post(
    auth("manageBoxingFixture"),
    validate(boxingFixtureValidation.createFixture),
    boxingFixtureController.createFixture
  )
  .get(
    validate(boxingFixtureValidation.getAllFixtures),
    boxingFixtureController.queryFixtures
  );

router
  .route("/fixture/live")
  .get(
    validate(boxingFixtureValidation.fetchBoxingLiveFixture),
    boxingFixtureController.fetchBoxingLiveFixture
  );

router
  .route("/fixture/other")
  .get(
    validate(boxingFixtureValidation.fetchBoxingOtherFixture),
    boxingFixtureController.fetchBoxingOtherFixture
  );
router
  .route("/fixture/:id")
  .get(
    validate(boxingFixtureValidation.getSingleFixture),
    boxingFixtureController.getSingleFixture
  )
  .patch(
    auth("manageBoxingFixture"),
    validate(boxingFixtureValidation.updateFixture),
    boxingFixtureController.updateFixture
  )
  .delete(
    auth("manageBoxingFixture"),
    validate(boxingFixtureValidation.deleteFixture),
    boxingFixtureController.deleteFixture
  );

module.exports = router;
