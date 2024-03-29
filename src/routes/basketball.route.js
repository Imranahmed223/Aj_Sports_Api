const express = require("express");
const validate = require("../middlewares/validate");
const { basketBallValidation } = require("../validations/");
const { basketballController } = require("../controllers");
const auth = require("../middlewares/auth");
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

router
  .route("/fixture/update/:id")
  .patch(
    auth("manageBasketball"),
    validate(basketBallValidation.updateFixture),
    basketballController.updateFixture
  );

router
  .route("/fixture/all/fetch")
  .get(
    auth("manageBasketball"),
    validate(basketBallValidation.fetchAllAdminFixture),
    basketballController.fetchAllAdminFixture
  );
module.exports = router;
