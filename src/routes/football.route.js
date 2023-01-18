const express = require("express");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const { footballValidation } = require("../validations/");
const { footballController } = require("../controllers");
const router = express.Router();

router.route("/leauge").get(footballController.fetchAllLeauges);
router
  .route("/fixture/live")
  .get(
    validate(footballValidation.fetchFootballLiveFixture),
    footballController.fetchFootballLiveFixture
  );

router
  .route("/fixture/other")
  .get(
    validate(footballValidation.fetchFootballOtherFixture),
    footballController.fetchFootballOtherFixture
  );

router
  .route("/fixture/single")
  .get(
    validate(footballValidation.fetchMatchByFixtureId),
    footballController.fetchMatchByFixtureId
  );

router
  .route("/lineup")
  .get(
    validate(footballValidation.fetechLinupOfFixture),
    footballController.fetechLinupOfFixture
  );

router
  .route("/standing")
  .get(
    validate(footballValidation.fetchStandingsByLeaugeId),
    footballController.fetchStandingsByLeaugeId
  );

router
  .route("/fixture/update/:id")
  .patch(
    auth("manageFootball"),
    validate(footballValidation.updateFixture),
    footballController.updateFixture
  );

router
  .route("/fixture/all/fetch")
  .get(
    auth("manageFootball"),
    validate(footballValidation.fetchAllAdminFixture),
    footballController.fetchAllAdminFixture
  );

router
  .route("/fixture/leauge/")
  .get(
    validate(footballValidation.fetchFixtureByLeaugeId),
    footballController.fetchFixtureByLeaugeId
  );
module.exports = router;
