const pick = require("../utils/pick");
const catchAsync = require("../utils/catchAsync");
const { basketballService } = require("../services");
const { basketballLib } = require("./lib");

const fetchBasketballLeauges = catchAsync(async (req, res) => {
  const result = await basketballService.fetchBasketballLeauges();
  res.send(result);
});

const fetchGamesByLeaugeId = catchAsync(async (req, res) => {
  const query = pick(req.query, ["league", "timezone"]);
  let result = await basketballService.fetchGamesByLeaugeId(query);
  result = await basketballLib.filterGamesWithTimeRange(result);
  res.send(result);
});

const fetchStandingsByLeaugeId = catchAsync(async (req, res) => {
  const query = pick(req.query, ["league"]);
  let result = await basketballService.fetchStandingsByLeaugeId(query);
  res.send(result);
});

module.exports = {
  fetchBasketballLeauges,
  fetchGamesByLeaugeId,
  fetchStandingsByLeaugeId,
};
