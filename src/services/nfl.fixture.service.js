const httpStatus = require("http-status");
const { NFLFixture, NFLTeam } = require("../models");
const ApiError = require("../utils/ApiError");
/**
 * Create a fixture
 * @param {Object} fixtureBody
 * @returns {Promise<NFLFixture>}
 */
const createFixture = async (fixtureBody) => {
  console.log(fixtureBody);
  if (
    (await NFLTeam.findById(fixtureBody.teams.away)) === null ||
    (await NFLTeam.findById(fixtureBody.teams.home)) === null
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Team not found!");
  }
  return await NFLFixture.create(fixtureBody);
};

/**
 *
 * @param {*} filter
 * @param {*} options
 * @returns
 */
const fetchNflLiveFixture = async (options) => {
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
                "LIVE",
                "Round 1",
                "Round 2",
                "Round 4",
                "Over Time",
                "Break Time",
                "Halftime",
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
            "status.short": {
              $in: ["Finished", "Cancelled", "Postpond"],
            },
            category: "hot",
          },
        ],
      },
    ],
  };
  return await NFLFixture.paginate(filter, options);
};

const fetchNflOtherFixture = async (options) => {
  filter = {
    "fixture.date": {
      $gte: new Date(),
      $lte: new Date().setDate(new Date().getDate() + 7),
    },
    "fixture.status.short": { $in: ["Not Started"] },
    category: "other",
  };
  return await NFLFixture.paginate(filter, options);
};
/**
 *
 * @param {*} filter
 * @param {*} options
 * @returns {Promise<Results>}
 */
const queryFixture = async (filter, options) => {
  return await NFLFixture.paginate(filter, options);
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
  fetchNflLiveFixture,
  fetchNflOtherFixture,
};
