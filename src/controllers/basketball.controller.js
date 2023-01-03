const pick = require("../utils/pick");
const catchAsync = require("../utils/catchAsync");
const { basketballService, footballService } = require("../services");
const { basketballLib } = require("./lib");

const fetchBasketballLeauges = catchAsync(async (req, res) => {
  const result = await basketballService.fetchBasketballLeauges();
  res.send(result);
});

const fetchBasketBallLiveFixtures = catchAsync(async (req, res) => {
  const options = pick(req.query, ["page", "limit", "skip"]);
  let result = await basketballService.fetchBasketBallLiveFixtures(options);
  res.send(result);
});

const fetchbasketBalllOtherFixture = catchAsync(async (req, res) => {
  const options = pick(req.query, ["page", "limit", "skip"]);
  let result = await basketballService.fetchbasketBalllOtherFixture(options);
  res.send(result);
});

const fetchMatchByFixtureId = catchAsync(async (req, res) => {
  const result = await basketballService.fetchMatchByFixtureId(req.query);
  res.send(result);
});

const fetchFixtureByLeaugeId = catchAsync(async (req, res) => {
  const options = pick(req.query, ["page", "limit", "skip", "id"]);
  const response = await basketballService.fetchFixtureByLeaugeId(options);
  res.send(response);
});

const fetchStandingsByLeaugeId = catchAsync(async (req, res) => {
  const query = pick(req.query, ["league"]);
  let result = await basketballService.fetchStandingsByLeaugeId(query);
  res.send(result);
});

const updateFixture = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { body } = req;
  const fixture = await basketballService.updateFixture(body, id);
  res.send(fixture);
});

const fetchAllAdminFixture = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ["page", "limit", "sortBy"]);
  filter["date"] = {
    $gte: new Date(new Date()),
    $lte: new Date(new Date().setDate(new Date().getDate() + 10)),
  };
  const result = await basketballService.fetchAllAdminFixture(filter, options);
  res.send(result);
});
module.exports = {
  fetchBasketballLeauges,
  fetchBasketBallLiveFixtures,
  fetchbasketBalllOtherFixture,
  fetchStandingsByLeaugeId,
  fetchMatchByFixtureId,
  fetchFixtureByLeaugeId,
  updateFixture,
  fetchAllAdminFixture,
};
