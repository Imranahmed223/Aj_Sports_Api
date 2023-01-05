const Joi = require("joi");
const checkoutWithStripe = {
  body: Joi.object()
    .keys({
      number: Joi.string().required().description("card number is required"),
      exp_month: Joi.number()
        .required()
        .description("Expire Month is required"),
      exp_year: Joi.number().required().description("Expired Year is required"),
      cvc: Joi.string().required().description("CVC is required"),
      cardHolderName: Joi.string().required(),
      amount: Joi.number().required(),
    })
    .min(1),
};

module.exports = {
  checkoutWithStripe,
};
