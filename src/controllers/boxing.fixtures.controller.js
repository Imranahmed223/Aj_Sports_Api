const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { boxingFixtureService } = require("../services");
const config = require("../config/config");

const createFixture = catchAsync(async (req, res) => {
  let body = req.body;
  const fixture = await boxingFixtureService.createFixture(body);
  res.status(httpStatus.CREATED).send(fixture);
});

const fetchBoxingLiveFixture = catchAsync(async (req, res) => {
  const options = pick(req.query, ["page", "limit", "skip"]);
  options.populate = "teams.challenger,teams.defnender,winner";
  let result = await boxingFixtureService.fetchBoxingLiveFixture(options);
  result.results.forEach((res) => {
    res.teams = res.teams.toObject();
    if (res.teams.challenger) {
      res.teams.challenger.logo = config.rootPath + res.teams.challenger.logo;
    }
    if (res.teams.defnender) {
      res.teams.defnender.logo = config.rootPath + res.teams.defnender.logo;
    }
    if (res.winner) {
      res.winner.logo = config.rootPath + res.winner.logo;
    }
  });
  res.send(result);
});

const fetchBoxingOtherFixture = catchAsync(async (req, res) => {
  const options = pick(req.query, ["page", "limit", "skip"]);
  options.populate = "teams.challenger,teams.defnender,winner";
  let result = await boxingFixtureService.fetchNflOtherFixture(options);
  result.results.forEach((res) => {
    res.teams = res.teams.toObject();
    if (res.teams.challenger) {
      res.teams.challenger.logo = config.rootPath + res.teams.challenger.logo;
    }
    if (res.teams.defnender) {
      res.teams.defnender.logo = config.rootPath + res.teams.defnender.logo;
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
  options.populate = "teams.challenger,teams.defnender,winner";
  const result = await boxingFixtureService.queryFixture(filter, options);
  result.results.forEach((res) => {
    res.teams = res.teams.toObject();
    if (res.teams.challenger) {
      res.teams.challenger.logo = config.rootPath + res.teams.challenger.logo;
    }
    if (res.teams.defnender) {
      res.teams.defnender.logo = config.rootPath + res.teams.defnender.logo;
    }
    if (res.winner) {
      res.winner.logo = config.rootPath + res.winner.logo;
    }
  });
  res.send(result);
});

const getSingleFixture = catchAsync(async (req, res) => {
  const { id } = req.params;
  const fixture = await boxingFixtureService.getSingleFixture(id);
  if (!fixture) throw new ApiError(httpStatus.NOT_FOUND, "Nothing Found");
  res.send(fixture);
});

const updateFixture = catchAsync(async (req, res) => {
  const { id } = req.params;
  let updateBody = req.body;
  const fixture = await boxingFixtureService.updateFixture(id, updateBody);
  res.status(httpStatus.CREATED).send(fixture);
});

const deleteFixture = catchAsync(async (req, res) => {
  const { id } = req.params;
  const response = await boxingFixtureService.deleteFixture(id);
  res.send(response);
});

module.exports = {
  createFixture,
  queryFixtures,
  getSingleFixture,
  updateFixture,
  deleteFixture,
  fetchBoxingLiveFixture,
  fetchBoxingOtherFixture,
};
