const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createFixture = {
  body: Joi.object()
    .keys({
      date: Joi.date().required().description("Date is required"),
      category: Joi.string().valid("hot", "other").required(),
      venue: Joi.object().allow().optional(),
      status: Joi.object().keys({
        long: Joi.string().valid(
          "Round 1",
          "Round 2",
          "Round 3",
          "Round 4",
          "Round 5",
          "Round 6",
          "Round 7",
          "Round 8",
          "Round 9",
          "Round 10",
          "Round 11",
          "Round 12",
          "Over Time",
          "Break Time",
          "Halftime",
          "LIVE",
          "Not Started"
        ),
        elapsed: Joi.number().allow(null).optional(),
      }),
      teams: Joi.object().keys({
        challenger: Joi.string().custom(objectId).required(),
        defnender: Joi.string().custom(objectId).required(),
      }),
      winner: Joi.string().custom(objectId).allow(null).optional(),
    })
    .min(3)
    .max(7),
};

const fetchBoxingLiveFixture = {
  query: Joi.object()
    .keys({
      page: Joi.number().allow().optional(),
      limit: Joi.number().allow().optional(),
    })
    .min(0)
    .max(2),
};

const fetchBoxingOtherFixture = {
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
      date: Joi.date().optional(),
      category: Joi.string().valid("hot", "other").optional(),
      venue: Joi.object().optional(),
      status: Joi.object().keys({
        long: Joi.string().valid(
          "Round 1",
          "Round 2",
          "Round 3",
          "Round 4",
          "Round 5",
          "Round 6",
          "Round 7",
          "Round 8",
          "Round 9",
          "Round 10",
          "Round 11",
          "Round 12",
          "Over Time",
          "Break Time",
          "Halftime",
          "LIVE",
          "Not Started"
        ),
        elapsed: Joi.number().allow(null).optional(),
      }),
      teams: Joi.object().keys({
        challenger: Joi.string().custom(objectId).allow(null, "").optional(),
        defnender: Joi.string().custom(objectId).allow(null, "").optional(),
      }),
      winner: Joi.string().custom(objectId).allow(null).optional(),
    })
    .min(0)
    .max(6),
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
  fetchBoxingLiveFixture,
  fetchBoxingOtherFixture,
};
