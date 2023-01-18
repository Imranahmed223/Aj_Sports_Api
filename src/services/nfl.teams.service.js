const httpStatus = require("http-status");
const systemConfigService = require("./systemConfig.service");
const { tokenTypes } = require("../config/tokens");
const { NFLTeam } = require("../models");
const ApiError = require("../utils/ApiError");
/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<NFLTeam>}
 */
const createTeam = async (teamBody) => {
  if (await NFLTeam.isNameTaken(teamBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Name Already Taken");
  }
  const team = await NFLTeam.create(teamBody);
  return team;
};

/**
 *
 * @param {*} filter
 * @param {*} options
 * @returns {Promise<Results>}
 */
const queryTeams = async (filter, options) => {
  return await NFLTeam.paginate(filter, options);
};

/**
 *
 * @param {*} id
 * @returns {Promise<NFLTeam>}
 */
const getSingleTeam = async (id) => {
  return await NFLTeam.findById(id);
};

/**
 *
 * @param {*} id
 * @param {*} updateBody
 * @returns {Promise<NFLTeam>}
 */
const updateTeam = async (id, updateBody) => {
  if (updateBody.name)
    if (await NFLTeam.isNameTaken(updateBody.name)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Name Already Taken");
    }
  const team = await getSingleTeam(id);
  if (!team) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Nothing found");
  }
  if (updateBody.players) updateBody.players = JSON.parse(updateBody.players);
  Object.assign(team, updateBody);
  await team.save();
  return team;
};

const deleteTeam = async (id) => {
  const team = await getSingleTeam(id);
  if (!team) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Nothing found");
  }
  await team.remove();
  return { msg: "Team deleted" };
};

module.exports = {
  createTeam,
  queryTeams,
  getSingleTeam,
  updateTeam,
  deleteTeam,
};
