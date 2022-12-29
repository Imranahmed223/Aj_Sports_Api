const express = require("express");
const validate = require("../middlewares/validate");
const { basketBallValidation } = require("../validations/");
const { basketballController } = require("../controllers");
const router = express.Router();

router.route("/leauge").get(basketballController.fetchBasketballLeauges);
router
  .route("/fixture/live")
  .get(
    validate(basketBallValidation.fetchBasketBallLiveFixtures),
    basketballController.fetchBasketBallLiveFixtures
  );

router
  .route("/fixture/other")
  .get(
    validate(basketBallValidation.fetchbasketBalllOtherFixture),
    basketballController.fetchbasketBalllOtherFixture
  );

router
  .route("/fixture/single")
  .get(
    validate(basketBallValidation.fetchMatchByFixtureId),
    basketballController.fetchMatchByFixtureId
  );

router
  .route("/fixture/league")
  .get(
    validate(basketBallValidation.fetchFixtureByLeaugeId),
    basketballController.fetchFixtureByLeaugeId
  );
router
  .route("/standings")
  .get(
    validate(basketBallValidation.fetchStandingsByLeaugeId),
    basketballController.fetchStandingsByLeaugeId
  );

module.exports = router;
