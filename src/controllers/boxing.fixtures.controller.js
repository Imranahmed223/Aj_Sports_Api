const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { boxingFixtureService } = require("../services");
const config = require("../config/config");
const { boxingFixtureLib } = require("./lib");

const createFixture = catchAsync(async (req, res) => {
  let body = req.body;
  const fixture = await boxingFixtureService.createFixture(body);
  res.status(httpStatus.CREATED).send(fixture);
});

const queryFixtures = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  filter.gte = new Date(new Date().setDate(new Date().getDate() - 10));
  filter.lte = new Date(new Date().setDate(new Date().getDate() + 10));
  const result = await boxingFixtureService.queryFixture(filter, options);
  let newResult = await boxingFixtureLib.filterGamesWithTimeRange(result);
  res.send(newResult);
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
};
