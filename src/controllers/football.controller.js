const pick = require("../utils/pick");
const catchAsync = require("../utils/catchAsync");
const { footballService } = require("../services");

const fetchAllLeauges = catchAsync(async (req, res) => {
  const result = await footballService.fetchAllLeauges();
  res.send(result);
});

const fetchFootballLiveFixture = catchAsync(async (req, res) => {
  const options = pick(req.query, ["page", "limit", "skip"]);
  let result = await footballService.fetchFootballLiveFixture(options);
  res.send(result);
});

const fetchFootballOtherFixture = catchAsync(async (req, res) => {
  const options = pick(req.query, ["page", "limit", "skip"]);
  let result = await footballService.fetchFootballOtherFixture(options);
  res.send(result);
});

const fetchMatchByFixtureId = catchAsync(async (req, res) => {
  const result = await footballService.fetchMatchByFixtureId(req.query);
  res.send(result);
});

const fetchFixtureByLeaugeId = catchAsync(async (req, res) => {
  const options = pick(req.query, ["page", "limit", "skip", "id"]);
  const response = await footballService.fetchFixtureByLeaugeId(options);
  res.send(response);
});

const fetechLinupOfFixture = catchAsync(async (req, res) => {
  const query = pick(req.query, ["fixture"]);
  const result = await footballService.fetechLinupOfFixture(query);
  res.send(result);
});

const fetchStandingsByLeaugeId = catchAsync(async (req, res) => {
  query = pick(req.query, ["league"]);
  const result = await footballService.fetchStandingsByLeaugeId(query);
  res.send(result);
});
module.exports = {
  fetchFootballLiveFixture,
  fetechLinupOfFixture,
  fetchAllLeauges,
  fetchMatchByFixtureId,
  fetchStandingsByLeaugeId,
  fetchFixtureByLeaugeId,
  fetchFootballOtherFixture,
};
