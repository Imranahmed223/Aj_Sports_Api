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
  .route("/fixture/league")
  .get(
    validate(footballValidation.fetchFixtureByLeaugeId),
    footballController.fetchFixtureByLeaugeId
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

module.exports = router;
