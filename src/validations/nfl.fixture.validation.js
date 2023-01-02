const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createFixture = {
  body: Joi.object()
    .keys({
      date: Joi.date().required().description("Name is required"),
      category: Joi.string().valid("hot", "other").required(),
      venue: Joi.object().allow().optional(),
      status: Joi.object().keys({
        long: Joi.string().valid(
          "LIVE",
          "Round 1",
          "Round 2",
          "Round 4",
          "Over Time",
          "Break Time",
          "Halftime",
          "Not Started",
          "Finished"
        ),
        elapsed: Joi.number().allow(null).optional(),
      }),
      teams: Joi.object().keys({
        away: Joi.string().custom(objectId).allow(null, "").optional(),
        home: Joi.string().custom(objectId).allow(null).optional(),
      }),
      goals: Joi.object().keys({
        away: Joi.number().allow(null).optional(),
        home: Joi.number().allow(null).optional(),
      }),
      winner: Joi.string().custom(objectId).allow(null).optional(),
    })
    .min(2)
    .max(7),
};

const fetchNflLiveFixture = {
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

const getAllFixtures = {
  query: Joi.object().keys({
    page: Joi.number().allow().optional(),
    limit: Joi.number().allow().optional(),
    skip: Joi.number().allow().optional(),
  }),
};

const getSingleFixture = {
  query: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateFixture = {
  query: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      date: Joi.date().allow().optional(),
      category: Joi.string().valid("hot", "other"),
      venue: Joi.object().allow().optional(),
      status: Joi.object().keys({
        long: Joi.string().valid(
          "LIVE",
          "Round 1",
          "Round 2",
          "Round 4",
          "Over Time",
          "Break Time",
          "Halftime",
          "Not Started",
          "Finished"
        ),
        elapsed: Joi.number().allow(null).optional(),
      }),
      teams: Joi.object().keys({
        away: Joi.string().custom(objectId).allow(null).optional(),
        home: Joi.string().custom(objectId).allow(null).optional(),
      }),
      goals: Joi.object().keys({
        away: Joi.string().custom(objectId).allow(null).optional(),
        home: Joi.string().custom(objectId).allow(null).optional(),
      }),
      winner: Joi.string().custom(objectId).allow(null).optional(),
    })
    .min(2)
    .max(7),
};

const deleteFixture = {
  query: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createFixture,
  getAllFixtures,
  getSingleFixture,
  updateFixture,
  deleteFixture,
  fetchNflLiveFixture,
  fetchFootballOtherFixture,
};
