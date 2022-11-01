const pick = require("../utils/pick");
const catchAsync = require("../utils/catchAsync");
const { footballService } = require("../services");
const { footballLib } = require("./lib");

const fetchAllLeauges = catchAsync(async (req, res) => {
  const result = await footballService.fetchAllLeauges();
  res.send(result);
});

const fetchFixtureByLeaugesId = catchAsync(async (req, res) => {
  const query = pick(req.query, ["league", "timezone"]);
  let from = new Date();
  from = new Date(from.setDate(from.getDate() - 5));
  let to = new Date();
  to = new Date(to.setDate(to.getDate() + 10));
  query.from = from.toISOString().split("T")[0];
  query.to = to.toISOString().split("T")[0];
  query.season = to.getFullYear();
  query.status = "NS-1H-HT-2H-ET-P-BT-LIVE-FT-AET-PEN-BT-AWD";
  let result = await footballService.fetchFixtureByLeaugesId(query);
  result = await footballLib.categorizeMatches(result);
  res.send(result);
});

const fetchMatchByFixtureId = catchAsync(async (req, res) => {
  const query = pick(req.query, ["id", "timezone"]);
  const result = await footballService.fetchMatchByFixtureId(query);
  res.send(result);
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
  fetchFixtureByLeaugesId,
  fetechLinupOfFixture,
  fetchAllLeauges,
  fetchMatchByFixtureId,
  fetchStandingsByLeaugeId,
};
