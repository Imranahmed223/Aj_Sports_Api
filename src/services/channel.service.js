const httpStatus = require("http-status");
const { Channel } = require("../models");
const ApiError = require("../utils/ApiError");
/**
 * Create a channel
 * @param {Object} channelBody
 * @returns {Promise<Channel>}
 */
const createChannel = async (channelBody) => {
  channelBody.name = channelBody.name.toLowerCase();
  if (await Channel.isChannelExists(channelBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Channel name aleady exists!");
  }
  const channel = await Channel.create(channelBody);
  return channel;
};

/**
 * Query for channels
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryChannels = async (filter, options) => {
  const channels = await Channel.paginate(filter, options);
  return channels;
};

/**
 * Get channel by id
 * @param {ObjectId} id
 * @returns {Promise<Channel>}
 */
const getChannelById = async (id) => {
  return await Channel.findById(id);
};

/**
 * Update channel by id
 * @param {ObjectId} channelId
 * @param {Object} updateBody
 * @returns {Promise<Channel>}
 */
const updateChannel = async (channelId, updateBody) => {
  const channel = await getChannelById(channelId);
  if (!channel) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Channel not found!");
  }
  Object.assign(channel, updateBody);
  await channel.save();
  return channel;
};

/**
 * Delete channel by id
 * @param {ObjectId} channelId
 * @returns {Promise<Channel>}
 */
const deleteChannel = async (channelId) => {
  const channel = await getChannelById(channelId);
  if (!channel) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No channel found!");
  }
  await channel.remove();
  return (response = { msg: "Channel deleted" });
};

module.exports = {
  createChannel,
  queryChannels,
  getChannelById,
  updateChannel,
  deleteChannel,
};
