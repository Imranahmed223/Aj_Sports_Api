const Joi = require("joi");

const fetchFixtureByLeaugesId = {
  query: Joi.object()
    .keys({
      league: Joi.string()
        .regex(/^\d+$/)
        .required()
        .label("id should be valid number"),
      timezone: Joi.string().required().label("Timezone is required"),
    })
    .min(2)
    .max(2),
};

const fetchMatchByFixtureId = {
  query: Joi.object().keys({
    id: Joi.string()
      .regex(/^\d+$/)
      .required()
      .label("fixture should be a valid number"),
  }),
};

const fetechLinupOfFixture = {
  query: Joi.object().keys({
    fixture: Joi.string()
      .regex(/^\d+$/)
      .required()
      .label("fixture should be a valid number"),
  }),
};

const fetchStandingsByLeaugeId = {
  query: Joi.object().keys({
    league: Joi.string()
      .regex(/^\d+$/)
      .required()
      .label("league should be a valid number"),
  }),
};
module.exports = {
  fetchFixtureByLeaugesId,
  fetechLinupOfFixture,
  fetchMatchByFixtureId,
  fetchStandingsByLeaugeId,
};
