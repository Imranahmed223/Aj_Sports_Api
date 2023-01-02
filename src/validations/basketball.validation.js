const Joi = require("joi");
const { objectId } = require("./custom.validation");

const fetchBasketBallLiveFixtures = {
  query: Joi.object()
    .keys({
      page: Joi.number().allow().optional(),
      limit: Joi.number().allow().optional(),
    })
    .min(0)
    .max(2),
};

const fetchbasketBalllOtherFixture = {
  query: Joi.object()
    .keys({
      page: Joi.number().allow().optional(),
      limit: Joi.number().allow().optional(),
    })
    .min(0)
    .max(2),
};
const fetchFixtureByLeaugeId = {
  query: Joi.object()
    .keys({
      id: Joi.string()
        .regex(/^\d+$/)
        .required()
        .label("league id required and should be a valid number"),
      page: Joi.number().allow().optional(),
      limit: Joi.number().allow().optional(),
    })
    .min(1)
    .max(3),
};
const fetchMatchByFixtureId = {
  query: Joi.object()
    .keys({
      id: Joi.string()
        .regex(/^\d+$/)
        .required()
        .label("fixture id is required and should be a valid number!"),
    })
    .min(1)
    .max(1),
};
const fetchStandingsByLeaugeId = {
  query: Joi.object()
    .keys({
      id: Joi.string()
        .regex(/^\d+$/)
        .required()
        .label("league should be a valid number"),
    })
    .min(1)
    .max(1),
};

const updateFixture = {
  params: Joi.object()
    .keys({
      id: Joi.string()
        .regex(/^\d+$/)
        .required()
        .label("id should be a valid number"),
    })
    .min(1)
    .max(1),
  body: Joi.object().keys({
    category: Joi.string().valid("hot", "other"),
    date: Joi.date().allow().optional(),
    country: Joi.object().allow().optional(),
    league: Joi.object().allow().optional(),
    score: Joi.object().allow().optional(),
    stage: Joi.any().allow().optional(),
    status: Joi.any().allow().optional(),
    team: Joi.any().allow().optional(),
    time: Joi.string().allow().optional(),
    timezone: Joi.string().allow().optional(),
    week: Joi.any().allow().optional(),
  }),
};
module.exports = {
  fetchBasketBallLiveFixtures,
  fetchbasketBalllOtherFixture,
  fetchStandingsByLeaugeId,
  fetchFixtureByLeaugeId,
  fetchMatchByFixtureId,
  updateFixture,
};
