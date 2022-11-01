const Joi = require("joi");

const fetchGamesByLeaugeId = {
  query: Joi.object()
    .keys({
      league: Joi.string()
        .regex(/^\d+$/)
        .required()
        .label("leauge should be a valid number"),
      timezone: Joi.string().required(),
    })
    .min(2)
    .max(2),
};

const fetchStandingsByLeaugeId = {
  query: Joi.object()
    .keys({
      league: Joi.string()
        .regex(/^\d+$/)
        .required()
        .label("leauge should be a valid number"),
    })
    .min(1)
    .max(1),
};

module.exports = {
  fetchGamesByLeaugeId,
  fetchStandingsByLeaugeId,
};
