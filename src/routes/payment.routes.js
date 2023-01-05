const express = require("express");
const { paymentController } = require("../controllers");
const validate = require("../middlewares/validate");
const { paymentValidation } = require("../validations");

const router = express();

router
  .route("/stripe/checkout")
  .post(
    validate(paymentValidation.checkoutWithStripe),
    paymentController.checkoutWithStripe
  );

module.exports = router;
