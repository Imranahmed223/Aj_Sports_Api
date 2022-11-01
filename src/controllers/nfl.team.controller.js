const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { nflTeamService } = require("../services");
const config = require("../config/config");

const createTeam = catchAsync(async (req, res) => {
  let body = req.body;
  if (req.file) body.logo = req.file.filename;
  const team = await nflTeamService.createTeam(body);
  res.status(httpStatus.CREATED).send(team);
});

const queryTeams = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await nflTeamService.queryTeams(filter, options);
  result.results.forEach((element) => {
    element.logo = config.rootPath + element.logo;
  });
  res.send(result);
});

const getSingleTeam = catchAsync(async (req, res) => {
  const { id } = req.params;
  const team = await nflTeamService.getSingleTeam(id);
  if (!team) throw new ApiError(httpStatus.NOT_FOUND, "Nothing Found");
  team.logo = config.rootPath + team.logo;
  res.send(team);
});

const updateTeam = catchAsync(async (req, res) => {
  const { id } = req.params;
  let updateBody = req.body;
  if (req.file) updateBody.logo = req.file.filename;
  const team = await nflTeamService.updateTeam(id, updateBody);
  res.status(httpStatus.CREATED).send(team);
});

const deleteTeam = catchAsync(async (req, res) => {
  const { id } = req.params;
  const response = await nflTeamService.deleteTeam(id);
  res.send(response);
});

module.exports = {
  createTeam,
  queryTeams,
  getSingleTeam,
  updateTeam,
  deleteTeam,
};
