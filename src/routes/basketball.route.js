const express = require("express");
const validate = require("../middlewares/validate");
const { basketBallValidation } = require("../validations/");
const { basketballController } = require("../controllers");
const router = express.Router();

router.route("/leauge").get(basketballController.fetchBasketballLeauges);
router
  .route("/games")
  .get(
    validate(basketBallValidation.fetchGamesByLeaugeId),
    basketballController.fetchGamesByLeaugeId
  );

router
  .route("/standings")
  .get(
    validate(basketBallValidation.fetchStandingsByLeaugeId),
    basketballController.fetchStandingsByLeaugeId
  );

module.exports = router;
