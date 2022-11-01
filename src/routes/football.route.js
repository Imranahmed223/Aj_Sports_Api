const express = require("express");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const { footballValidation } = require("../validations/");
const { footballController } = require("../controllers");
const router = express.Router();

router.route("/leauge").get(footballController.fetchAllLeauges);
router
  .route("/fixture")
  .get(
    validate(footballValidation.fetchFixtureByLeaugesId),
    footballController.fetchFixtureByLeaugesId
  );
router
  .route("/fixture/id")
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

module.exports = router;
