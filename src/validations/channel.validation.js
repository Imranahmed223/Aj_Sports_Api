const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createChannel = {
  body: Joi.object()
    .keys({
      name: Joi.string().required().description("Channel name is required"),
      link: Joi.string().uri().required().description("Link is required"),
    })
    .min(1)
    .max(2),
};

const queryChannels = {
  query: Joi.object().keys({
    page: Joi.number().allow().optional(),
    limit: Joi.number().allow().optional(),
    skip: Joi.number().allow().optional(),
  }),
};

const getSingleChannelById = {
  query: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateChannel = {
  query: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().allow().optional(),
      link: Joi.string().uri().allow().optional(),
    })
    .min(1)
    .max(2),
};

const deleteChannel = {
  query: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createChannel,
  queryChannels,
  getSingleChannelById,
  updateChannel,
  deleteChannel,
};
