const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { notificationService } = require("../services");
const config = require("../config/config");
const { Client } = require("twitter-api-sdk");
const { Notification } = require("../models");
const logger = require("../config/logger");

const queryNotifications = catchAsync(async (req, res) => {
  const end_time = new Date();
  const from_time = new Date(new Date().setHours(new Date().getHours() - 24));
  const filter = pick(req.query, []);
  filter.createdAt = { $gte: from_time, $lte: end_time };
  console.log(filter);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const notifications = await notificationService.queryNotifications(
    filter,
    options
  );
  res.send(notifications);
});

module.exports = {
  queryNotifications,
};
