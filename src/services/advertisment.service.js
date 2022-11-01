const httpStatus = require("http-status");
const { Advertisment } = require("../models");
const ApiError = require("../utils/ApiError");
/**
 * Create a adver
 * @param {Object} adverBody
 * @returns {Promise<Advertisment>}
 */
const createAdvertisment = async (adverBody) => {
  if (await Advertisment.isPriorityTaken(adverBody.priority)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Priority Already Taken");
  }
  const adver = await Advertisment.create(adverBody);
  return adver;
};

/**
 * Query for adver
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAdvertisments = async (filter, options) => {
  const advers = await Advertisment.paginate(filter, options);
  return advers;
};

/**
 * Get adver by id
 * @param {ObjectId} id
 * @returns {Promise<Advertisment>}
 */
const getAdvertismentById = async (id) => {
  return await Advertisment.findById(id);
};

/**
 * Update adver by id
 * @param {ObjectId} adverId
 * @param {Object} adverBody
 * @returns {Promise<Advertisment>}
 */
const updateAdvertismentById = async (adverId, adverBody) => {
  const adver = await getAdvertismentById(adverId);
  if (await Advertisment.isPriorityTaken(adverBody.priority)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Priority Already Taken");
  }
  if (!adver) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Advertisment not found");
  }
  Object.assign(adver, adverBody);
  await adver.save();
  return adver;
};

/**
 * Delete adver by id
 * @param {ObjectId} adverId
 * @returns {Promise<Advertisment>}
 */
const deleteAdvertismentById = async (adverId) => {
  const adver = await getAdvertismentById(adverId);
  if (!adver) {
    throw new ApiError(httpStatus.BAD_REQUEST, "No Adevertisment found!");
  }
  await adver.remove();
  return (response = { msg: "adver deleted" });
};

module.exports = {
  createAdvertisment,
  queryAdvertisments,
  getAdvertismentById,
  updateAdvertismentById,
  deleteAdvertismentById,
};
