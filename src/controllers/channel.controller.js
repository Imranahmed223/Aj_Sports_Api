const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { channelService } = require("../services");

const createChannel = catchAsync(async (req, res) => {
  let body = req.body;
  const channel = await channelService.createChannel(body);
  res.status(httpStatus.CREATED).send(channel);
});

const queryChannels = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await channelService.queryChannels(filter, options);
  res.send(result);
});

const getChannelById = catchAsync(async (req, res) => {
  const channel = await channelService.getChannelById(req.params.id);
  if (!channel) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Channel not found");
  }
  res.send(channel);
});

const updateChannel = catchAsync(async (req, res) => {
  let updateChnnelBody = req.body;
  const channel = await channelService.updateChannel(
    req.params.id,
    updateChnnelBody
  );
  res.send(channel);
});

const deleteChannel = catchAsync(async (req, res) => {
  const response = await channelService.deleteChannel(req.params.id);
  res.status(httpStatus.OK).send(response);
});

module.exports = {
  createChannel,
  queryChannels,
  getChannelById,
  updateChannel,
  deleteChannel,
};
