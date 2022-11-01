const httpStatus = require("http-status");
const { NFLFixture } = require("../models");
const ApiError = require("../utils/ApiError");
/**
 * Create a fixture
 * @param {Object} fixtureBody
 * @returns {Promise<NFLFixture>}
 */
const createFixture = async (fixtureBody) => {
  return await NFLFixture.create(fixtureBody);
};

/**
 *
 * @param {*} filter
 * @param {*} options
 * @returns {Promise<Results>}
 */
const queryFixture = async (filter, options) => {
  return await NFLFixture.find(filter)
    .populate("teams.away")
    .populate("teams.home")
    .populate("winner");
};

/**
 *
 * @param {*} id
 * @returns {Promise<NFLFixture>}
 */
const getSingleFixture = async (id) => {
  return await NFLFixture.findById(id)
    .populate("teams.away")
    .populate("teams.home")
    .populate("winner");
};

/**
 *
 * @param {*} id
 * @param {*} updateBody
 * @returns {Promise<NFLFixture>}
 */
const updateFixture = async (id, updateBody) => {
  const fixture = await getSingleFixture(id);
  if (!fixture) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Nothing found");
  }
  Object.assign(fixture, updateBody);
  await fixture.save();
  return fixture;
};

/**
 *
 * @param {*} id
 * @returns {response<msg>}
 */
const deleteFixture = async (id) => {
  const fixture = await getSingleFixture(id);
  if (!fixture) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Nothing found");
  }
  await fixture.remove();
  return { msg: "Fixture deleted" };
};

module.exports = {
  createFixture,
  queryFixture,
  getSingleFixture,
  updateFixture,
  deleteFixture,
};
