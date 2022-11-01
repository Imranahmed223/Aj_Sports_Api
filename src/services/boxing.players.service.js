const httpStatus = require("http-status");
const { tokenTypes } = require("../config/tokens");
const { BoxingPlayer } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<BoxingPlayer>}
 */
const createBoxingPlayer = async (userBody) => {
  const player = await BoxingPlayer.create(userBody);
  return player;
};

/**
 *
 * @param {*} filter
 * @param {*} options
 * @returns {Promise<Results>}
 */
const queryPlayers = async (filter, options) => {
  return await BoxingPlayer.paginate(filter, options);
};

/**
 *
 * @param {*} id
 * @returns {Promise<BoxingPlayer>}
 */
const getSinglePlayer = async (id) => {
  return await BoxingPlayer.findById(id);
};

/**
 *
 * @param {*} id
 * @param {*} updatedBody
 * @returns {Promise<BoxingPlayer>}
 */
const updatePlayer = async (id, updatedBody) => {
  const player = await getSinglePlayer(id);
  if (!player) throw new ApiError(httpStatus.BAD_REQUEST, "Nothing found");
  Object.assign(player, updatedBody);
  await player.save();
  return player;
};

/**
 *
 * @param {*} id
 * @returns {Response}
 */
const deletePlayer = async (id) => {
  const player = await getSinglePlayer(id);
  if (!player) throw new ApiError(httpStatus.BAD_REQUEST, "Nothing found");
  await player.remove();
  return { msg: "Player deleted" };
};

module.exports = {
  createBoxingPlayer,
  queryPlayers,
  getSinglePlayer,
  updatePlayer,
  deletePlayer,
};
