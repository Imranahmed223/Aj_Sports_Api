const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { nflFixtureService } = require("../services");
const config = require("../config/config");
const { nfcFixtureLib } = require("./lib");

const createFixture = catchAsync(async (req, res) => {
  let body = req.body;
  const fixture = await nflFixtureService.createFixture(body);
  res.status(httpStatus.CREATED).send(fixture);
});

const fetchNflLiveFixture = catchAsync(async (req, res) => {
  const options = pick(req.query, ["page", "limit", "skip"]);
  options.populate = "teams.away,teams.home,winner";
  let result = await nflFixtureService.fetchNflLiveFixture(options);
  result.results.forEach((res) => {
    res.teams = res.teams.toObject();
    if (res.teams.away) {
      res.teams.away.logo = config.rootPath + res.teams.away.logo;
    }
    if (res.teams.home) {
      res.teams.home.logo = config.rootPath + res.teams.home.logo;
    }
    if (res.winner) {
      res.winner.logo = config.rootPath + res.winner.logo;
    }
  });
  res.send(result);
});

const fetchNflOtherFixture = catchAsync(async (req, res) => {
  const options = pick(req.query, ["page", "limit", "skip"]);
  options.populate = "teams.away,teams.home,winner";
  let result = await nflFixtureService.fetchNflOtherFixture(options);
  result.results.forEach((res) => {
    res.teams = res.teams.toObject();
    if (res.teams.away) {
      res.teams.away.logo = config.rootPath + res.teams.away.logo;
    }
    if (res.teams.home) {
      res.teams.home.logo = config.rootPath + res.teams.home.logo;
    }
    if (res.winner) {
      res.winner.logo = config.rootPath + res.winner.logo;
    }
  });
  res.send(result);
});
const queryFixtures = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  filter["date"] = {
    $gte: new Date(new Date()),
    $lte: new Date(new Date().setDate(new Date().getDate() + 10)),
  };
  options.populate = "teams.away,teams.home,winner";
  const result = await nflFixtureService.queryFixture(filter, options);
  result.results.forEach((res) => {
    res.teams = res.teams.toObject();
    if (res.teams.away) {
      res.teams.away.logo = config.rootPath + res.teams.away.logo;
    }
    if (res.teams.home) {
      res.teams.home.logo = config.rootPath + res.teams.home.logo;
    }
    if (res.winner) {
      res.winner.logo = config.rootPath + res.winner.logo;
    }
  });
  res.send(result);
});

const getSingleFixture = catchAsync(async (req, res) => {
  const { id } = req.params;
  const fixture = await nflFixtureService.getSingleFixture(id);
  if (!fixture) throw new ApiError(httpStatus.NOT_FOUND, "Nothing Found");
  if (fixture.teams.away) {
    fixture.teams.away.logo = config.rootPath + fixture.teams.away.logo;
  }
  if (fixture.teams.home) {
    fixture.teams.home.logo = config.rootPath + fixture.teams.home.logo;
  }
  if (fixture.winner) {
    fixture.winner.logo = config.rootPath + fixture.winner.logo;
  }
  res.send(fixture);
});

const updateFixture = catchAsync(async (req, res) => {
  const { id } = req.params;
  let updateBody = req.body;
  const fixture = await nflFixtureService.updateFixture(id, updateBody);
  res.status(httpStatus.CREATED).send(fixture);
});

const deleteFixture = catchAsync(async (req, res) => {
  const { id } = req.params;
  const response = await nflFixtureService.deleteFixture(id);
  res.send(response);
});

module.exports = {
  createFixture,
  queryFixtures,
  getSingleFixture,
  updateFixture,
  deleteFixture,
  fetchNflLiveFixture,
  fetchNflOtherFixture,
};
