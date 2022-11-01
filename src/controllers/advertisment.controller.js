const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { advertismentService } = require("../services");
const config = require("../config/config");

const createAdvertisment = catchAsync(async (req, res) => {
  let body = req.body;
  if (req.file) body.photoPath = req.file.filename;
  const adver = await advertismentService.createAdvertisment(body);
  res.status(httpStatus.CREATED).send(adver);
});

const queryAdvertisments = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["type", "prority"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await advertismentService.queryAdvertisments(filter, options);
  result.results.forEach((res) => {
    res.photoPath = config.rootPath + res.photoPath;
  });
  res.send(result);
});

const getAdvertismentById = catchAsync(async (req, res) => {
  const adver = await advertismentService.getAdvertismentById(req.params.id);
  if (!adver) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Advertisment not found");
  }
  adver.photoPath = config.rootPath + adver.photoPath;
  res.send(adver);
});

const updateAdvertismentById = catchAsync(async (req, res) => {
  let adverUpdateBody = req.body;
  if (req.file) body.photoPath = req.file.filename;
  const adver = await advertismentService.updateAdvertismentById(
    req.params.id,
    adverUpdateBody
  );
  res.send(adver);
});

const deleteAdvertismentById = catchAsync(async (req, res) => {
  const response = await advertismentService.deleteAdvertismentById(
    req.params.id
  );
  res.status(httpStatus.OK).send(response);
});

module.exports = {
  createAdvertisment,
  queryAdvertisments,
  getAdvertismentById,
  updateAdvertismentById,
  deleteAdvertismentById,
};
