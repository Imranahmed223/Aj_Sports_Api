const httpStatus = require("http-status");
const { BoxingFixture } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create a fixture
 * @param {Object} fixtureBody
 * @returns {Promise<BoxingFixture>}
 */
const createFixture = async (fixtureBody) => {
  return await BoxingFixture.create(fixtureBody);
};

/**
 *
 * @param {*} filter
 * @param {*} options
 * @returns {Promise<Results>}
 */
const queryFixture = async (filter, options) => {
  return await BoxingFixture.find(filter)
    .populate("teams.challenger")
    .populate("teams.defnender")
    .populate("winner");
};

/**
 *
 * @param {*} id
 * @returns {Promise<BoxingFixture>}
 */
const getSingleFixture = async (id) => {
  return await BoxingFixture.findById(id)
    .populate("teams.challenger")
    .populate("teams.defnender")
    .populate("winner");
};

/**
 *
 * @param {*} id
 * @param {*} updateBody
 * @returns {Promise<BoxingFixture>}
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
