const Joi = require("joi");
const { objectId } = require("./custom.validation");
const createAdvertisment = {
  body: Joi.object()
    .keys({
      type: Joi.string().valid("Banner", "Native").required(),
      text: Joi.string().allow().optional(),
      link: Joi.string().uri().required(),
      priority: Joi.number().required(),
    })
    .min(3)
    .max(4),
};

const queryAdvertisments = {
  query: Joi.object().keys({
    limit: Joi.number().allow().optional(),
    page: Joi.number().allow().optional(),
    skip: Joi.number().allow().optional(),
  }),
};

const getAdvertisment = {
  query: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateAdvertisment = {
  query: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      type: Joi.string().valid("Banner", "Native").allow().optional(),
      text: Joi.string().allow().optional(),
      link: Joi.string().uri().allow().optional(),
      priority: Joi.number().allow().optional(),
      photoPath: Joi.string().allow().optional(),
    })
    .min(1)
    .max(4),
};
const deletAdvertisment = {
  query: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createAdvertisment,
  queryAdvertisments,
  getAdvertisment,
  updateAdvertisment,
  deletAdvertisment,
};
