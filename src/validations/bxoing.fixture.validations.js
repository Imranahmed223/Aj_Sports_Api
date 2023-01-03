const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createFixture = {
  body: Joi.object()
    .keys({
      cartegory: Joi.string().valid("hot", "other").required(),
      date: Joi.date().required().description("Name is required"),
      venue: Joi.object().allow().optional(),
      status: Joi.object().allow().optional(),
      teams: Joi.object().keys({
        challenger: Joi.string().custom(objectId).allow(null, "").optional(),
        defnender: Joi.string().custom(objectId).allow(null).optional(),
      }),
      winner: Joi.string().custom(objectId).allow(null).optional(),
    })
    .min(2)
    .max(6),
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
      cartegory: Joi.string().valid("hot", "other").required(),
      date: Joi.date().required().description("Name is required"),
      venue: Joi.object().allow().optional(),
      status: Joi.object().allow().optional(),
      teams: Joi.object().keys({
        challenger: Joi.string().custom(objectId).allow(null, "").optional(),
        defnender: Joi.string().custom(objectId).allow(null).optional(),
      }),
      winner: Joi.string().custom(objectId).allow(null).optional(),
    })
    .min(2)
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
