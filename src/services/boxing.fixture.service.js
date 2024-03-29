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

const fetchBoxingLiveFixture = async (options) => {
  let to = new Date();
  let from = new Date(new Date().setHours(new Date().getHours() - 6));
  filter = {
    $or: [
      {
        $and: [
          {
            date: {
              $gte: new Date(new Date().setHours(new Date().getHours() - 5)),
              $lte: new Date(new Date().setDate(new Date().getDate() + 7)),
            },
            "status.long": {
              $in: [
                "Round 1",
                "Round 2",
                "Round 3",
                "Round 4",
                "Round 5",
                "Round 6",
                "Round 7",
                "Round 8",
                "Round 9",
                "Round 10",
                "Round 11",
                "Round 12",
                "Over Time",
                "Break Time",
                "Halftime",
                "LIVE",
                "Not Started",
              ],
            },
            category: "hot",
          },
        ],
      },
      {
        $and: [
          {
            date: { $gte: from, $lte: to },
            "status.long": {
              $in: ["Finished", "Cancelled", "Postpond"],
            },
            category: "hot",
          },
        ],
      },
    ],
  };
  return await BoxingFixture.paginate(filter, options);
};

/**
 *
 * @param {*} options
 * @returns
 */
const fetchNflOtherFixture = async (options) => {
  filter = {
    date: {
      $gte: new Date(),
      $lte: new Date().setDate(new Date().getDate() + 7),
    },
    "status.long": { $in: ["Not Started"] },
    category: "other",
  };
  return await BoxingFixture.paginate(filter, options);
};

/**
 *
 * @param {*} filter
 * @param {*} options
 * @returns {Promise<Results>}
 */
const queryFixture = async (filter, options) => {
  return await BoxingFixture.paginate(filter, options);
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
  fetchBoxingLiveFixture,
  fetchNflOtherFixture,
};
