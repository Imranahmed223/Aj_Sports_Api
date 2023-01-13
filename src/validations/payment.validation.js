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

const checkoutWithPaypal = {
  body: Joi.object().keys({
    amount: Joi.number().required(),
  }),
};
const checkoutWithCrypto = {
  body: Joi.object().keys({
    amount: Joi.number().required(),
    email: Joi.string().email().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    company: Joi.string().optional(),
    adr1: Joi.string().optional(),
    adr2: Joi.string().optional(),
    zip: Joi.number().optional(),
    city: Joi.string().optional(),
    countrycode: Joi.string()
      .min(2)
      .max(2)
      .label("Country code should be two characters long")
      .optional(),
  }),
};
module.exports = {
  checkoutWithStripe,
  checkoutWithPaypal,
  checkoutWithCrypto,
};
