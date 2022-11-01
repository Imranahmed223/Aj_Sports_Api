const httpStatus = require("http-status");
const { tokenTypes } = require("../config/tokens");
const { Notification } = require("../models");
const ApiError = require("../utils/ApiError");

const queryNotifications = async (filter, options) => {
  return Notification.paginate(filter, options);
};

module.exports = {
  queryNotifications,
};
