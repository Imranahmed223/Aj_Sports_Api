const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const {} = require("../services");
const config = require("../config/config");
const stripe = require("stripe")(config.strip.secretKey);
var paypal = require("paypal-node-sdk");
const checkoutWithStripe = catchAsync(async (req, res) => {
  const { number, exp_month, exp_year, cvc, amount, cardHolderName } = req.body;
  const token = await stripe.tokens.create({
    card: {
      number: String(number),
      exp_month: Number(exp_month),
      exp_year: Number(exp_year),
      cvc: String(cvc),
    },
  });
  try {
    const customer = await stripe.customers.create({
      name: cardHolderName,
      source: token.id,
    });
    const charge = await stripe.charges.create({
      amount: amount * 100,
      currency: "gbp",
      customer: customer.id,
      description: `Service donation`,
    });
    console.log(charge);
    res.status(httpStatus.OK).json({ msg: "Donation recieved successfully!" });
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ msg: "payment failed" });
  }
});

module.exports = {
  checkoutWithStripe,
};
