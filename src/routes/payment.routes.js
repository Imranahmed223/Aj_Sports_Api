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

router
  .route("/paypal")
  .post(
    validate(paymentValidation.checkoutWithPaypal),
    paymentController.checkoutWithPaypal
  );

router.route("/paypal/success").get(paymentController.paypalCheckoutSuccess);
router.route("/paypal/cancel").get(paymentController.paypalCancelCheckout);
router
  .route("/bitcoin")
  .post(
    validate(paymentValidation.checkoutWithCrypto),
    paymentController.checkoutWithCrypto
  );

router.route("/bitcoin/success").get(paymentController.cryptoCheckoutSuccess);
router.route("/bitcoin/cancel").get(paymentController.cryptoCheckoutFailed);
module.exports = router;
