const Joi = require("joi");

const queryNotifications = {
  query: Joi.object().keys({
    limit: Joi.number().allow().optional(),
    page: Joi.number().allow().optional(),
    skip: Joi.number().allow().optional(),
  }),
};

module.exports = {
  queryNotifications,
};
