const Joi = require("joi");
const { objectId } = require("./custom.validation");
const createTeam = {
  body: Joi.object()
    .keys({
      name: Joi.string().required().description("Name is required"),
      players: Joi.any().allow().optional(),
    })
    .min(1)
    .max(2),
};

const getAllTeams = {
  query: Joi.object().keys({
    page: Joi.number().allow().optional(),
    limit: Joi.number().allow().optional(),
    skip: Joi.number().allow().optional(),
  }),
};

const getSingleTeam = {
  query: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateTeam = {
  query: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().allow().optional(),
      players: Joi.any().allow().optional(),
      logo: Joi.string().allow().optional(),
    })
    .min(1)
    .max(3),
};

const deleteTeam = {
  query: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTeam,
  getAllTeams,
  getSingleTeam,
  updateTeam,
  deleteTeam,
};
