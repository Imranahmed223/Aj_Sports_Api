const Joi = require("joi");
const { objectId } = require("./custom.validation");

const fetchFootballLiveFixture = {
  query: Joi.object()
    .keys({
      page: Joi.number().allow().optional(),
      limit: Joi.number().allow().optional(),
    })
    .min(0)
    .max(2),
};

const fetchFootballOtherFixture = {
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

const updateFixture = {
  params: Joi.object()
    .keys({
      id: Joi.string()
        .regex(/^\d+$/)
        .required()
        .label("league should be a valid number"),
    })
    .min(1)
    .max(1),
  body: Joi.object().keys({
    category: Joi.string().valid("hot", "other"),
    fixture: Joi.object().allow().optional(),
    league: Joi.object().allow().optional(),
    score: Joi.object().allow().optional(),
    team: Joi.object().allow().optional(),
  }),
};

const fetchAllAdminFixture = {
  query: Joi.object().keys({
    page: Joi.number().allow().optional(),
    limit: Joi.number().allow().optional(),
    skip: Joi.number().allow().optional(),
  }),
};
module.exports = {
  fetechLinupOfFixture,
  fetchMatchByFixtureId,
  fetchStandingsByLeaugeId,
  fetchFixtureByLeaugeId,
  fetchFootballLiveFixture,
  fetchFootballOtherFixture,
  updateFixture,
  fetchAllAdminFixture,
};
