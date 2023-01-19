const config = require("../config/config");
const { default: axios } = require("axios");
const footballData = require("../../football_data");
const { Football } = require("../models");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

/**
 *
 * @param {*} filter
 * @param {*} options
 * @returns
 */
const fetchFootballLiveFixture = async (options) => {
  let to = new Date();
  let from = new Date(new Date().setHours(new Date().getHours() - 6));
  filter = {
    $or: [
      {
        $and: [
          {
            "fixture.date": {
              $gte: new Date(new Date().setHours(new Date().getHours() - 5)),
              $lte: new Date(new Date().setDate(new Date().getDate() + 7)),
            },
            "fixture.status.short": {
              $in: ["LIVE", "1H", "HT", "2H", "ET", "BT", "P", "NS"],
            },
            category: "hot",
          },
        ],
      },
      {
        $and: [
          {
            "fixture.date": { $gte: from, $lte: to },
            "fixture.status.short": {
              $in: ["FT", "AET", "PEN", "PST", "CANC", "ABD", "AWD"],
            },
            category: "hot",
          },
        ],
      },
    ],
  };
  return await Football.paginate(filter, options);
};

/**
 *
 * @param {*} filter
 * @param {*} options
 * @returns
 */
const fetchFootballOtherFixture = async (options) => {
  filter = {
    "fixture.date": {
      $gte: new Date(),
      $lte: new Date().setDate(new Date().getDate() + 7),
    },
    "fixture.status.short": { $in: ["NS"] },
    category: "other",
  };
  return await Football.paginate(filter, options);
};

/**
 *
 * @param {*} id
 * @returns
 */
const fetchFixtureByLeaugeId = async (options) => {
  const filter = {
    "league.id": Number(options.id),
    "fixture.date": {
      $gte: new Date(),
      $lte: new Date().setDate(new Date().getDate() + 7),
    },
  };
  return await Football.paginate(filter, options);
};
/**
 *
 * @returns {Array<Response>}
 */
const fetchAllLeauges = async () => {
  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/leagues",
    headers: {
      "X-RapidAPI-Key": config.ripidFootballApi.key,
      "X-RapidAPI-Host": config.ripidFootballApi.host,
    },
  };
  const response = await axios(options);
  const { data } = response;
  const newData = [];
  for (let i = 0; i < data.response.length; i++) {
    footballData.forEach((f) => {
      if (
        f.name.toLocaleLowerCase() ==
          data.response[i].league.name.toLowerCase() &&
        f.country.toLocaleLowerCase() ==
          data.response[i].country.name.toLowerCase()
      ) {
        newData.push({
          leauge: data.response[i].league,
          country: data.response[i].country,
        });
      }
    });
  }
  data.response = newData;
  data.results = data.response.length;
  return data;
};

const fetchMatchByFixtureId = async (query) => {
  const filter = { "fixture.id": Number(query.id) };
  const fixture = await Football.findOne(filter);
  if (!fixture) throw new ApiError(httpStatus.BAD_REQUEST, "No fixture found!");
  return fixture;
};
/**
 *
 * @param {*} params
 * @returns {Object<Response>}
 */
const fetechLinupOfFixture = async (query) => {
  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/fixtures/lineups",
    params: query,
    headers: {
      "X-RapidAPI-Key": config.ripidFootballApi.key,
      "X-RapidAPI-Host": config.ripidFootballApi.host,
    },
  };

  const response = await axios(options);
  return response.data;
};

const fetchStandingsByLeaugeId = async (query) => {
  query.season = new Date().getFullYear();
  console.log(query);
  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/standings",
    params: query,
    headers: {
      "X-RapidAPI-Key": config.ripidFootballApi.key,
      "X-RapidAPI-Host": config.ripidFootballApi.host,
    },
  };

  const response = await axios(options);
  return response.data;
};

const updateFixture = async (body, id) => {
  const fixture = await Football.findById(id);
  if (!fixture) throw new ApiError(httpStatus.NOT_FOUND, "No fixture found!");
  Object.assign(fixture, body);
  await fixture.save();
  return fixture;
};

const fetchAllAdminFixture = async (filter, options) => {
  return await Football.paginate(filter, options);
};
module.exports = {
  fetchAllLeauges,
  fetechLinupOfFixture,
  fetchMatchByFixtureId,
  fetchStandingsByLeaugeId,
  fetchFootballLiveFixture,
  fetchFixtureByLeaugeId,
  fetchFootballOtherFixture,
  updateFixture,
  fetchAllAdminFixture,
};
