const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { boxingPlayersService } = require("../services");
const config = require("../config/config");

const createPlayer = catchAsync(async (req, res) => {
  let body = req.body;
  if (req.file) body.logo = req.file.filename;
  const player = await boxingPlayersService.createBoxingPlayer(body);
  res.status(httpStatus.CREATED).send(player);
});

const queryPlayers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await boxingPlayersService.queryPlayers(filter, options);
  result.results.forEach((element) => {
    element.logo = config.rootPath + element.logo;
  });
  res.send(result);
});

const getSinglePlayer = catchAsync(async (req, res) => {
  const player = await boxingPlayersService.getSinglePlayer(req.params.id);
  if (!player) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Nothing found");
  }
  player.logo = config.rootPath + player.logo;
  res.send(player);
});

const updatePlayer = catchAsync(async (req, res) => {
  let updateUserBody = req.body;
  const player = await boxingPlayersService.updatePlayer(
    req.params.id,
    updateUserBody
  );
  res.send(player);
});

const deletePlayer = catchAsync(async (req, res) => {
  const response = await boxingPlayersService.deletePlayer(req.params.id);
  res.status(httpStatus.OK).send(response);
});

module.exports = {
  createPlayer,
  queryPlayers,
  getSinglePlayer,
  updatePlayer,
  deletePlayer,
};
