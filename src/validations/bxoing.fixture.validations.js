const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createFixture = {
  body: Joi.object()
    .keys({
      date: Joi.date().required().description("Name is required"),
      isLive: Joi.boolean().allow().optional(),
      venue: Joi.object().allow().optional(),
      status: Joi.object().allow().optional(),
      teams: Joi.object().required().description("Team is required"),
      winner: Joi.any().allow().optional(),
    })
    .min(2)
    .max(6),
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
      isLive: Joi.boolean().allow().optional(),
      venue: Joi.object().allow().optional(),
      status: Joi.object().allow().optional(),
      teams: Joi.object().allow().optional(),
      winner: Joi.string().allow().optional(),
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
};
