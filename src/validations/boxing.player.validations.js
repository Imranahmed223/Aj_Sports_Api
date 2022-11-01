const Joi = require("joi");
const { objectId } = require("./custom.validation");
const createPlayer = {
  body: Joi.object()
    .keys({
      name: Joi.string().required().description("Name is required"),
      active: Joi.boolean().allow().optional(),
    })
    .min(1)
    .max(2),
};

const queryPlayes = {
  query: Joi.object().keys({
    page: Joi.number().allow().optional(),
    limit: Joi.number().allow().optional(),
    skip: Joi.number().allow().optional(),
  }),
};

const getSinglePlayer = {
  query: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updatePlayer = {
  query: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().allow().optional(),
      active: Joi.boolean().allow().optional(),
      logo: Joi.string().allow().optional(),
    })
    .min(1)
    .max(3),
};

const deletePlayer = {
  query: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPlayer,
  queryPlayes,
  getSinglePlayer,
  getSinglePlayer,
  updatePlayer,
  deletePlayer,
};
