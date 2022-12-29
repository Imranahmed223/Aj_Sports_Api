const config = require("../config/config");
const { default: axios } = require("axios");
const { BasketBall } = require("../models");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const fetchBasketballLeauges = async () => {
  const options = {
    method: "GET",
    url: "https://api-basketball.p.rapidapi.com/leagues",
    headers: {
      "X-RapidAPI-Key": config.ripidBasketballApi.key,
      "X-RapidAPI-Host": config.ripidBasketballApi.host,
    },
  };
  const response = await axios(options);
  const { data } = response;
  const newData = [];
  for (let i = 0; i < data.response.length; i++) {
    if (
      data.response[i].name == "NBA" &&
      data.response[i].country.name == "USA"
    ) {
      newData.push({
        leauge: data.response[i],
      });
    }
  }
  data.response = newData;
  data.results = data.response.length;
  return data;
};

const fetchBasketBallLiveFixtures = async (options) => {
  let to = new Date();
  let from = new Date(new Date().setHours(new Date().getHours() - 4));
  filter = {
    $or: [
      {
        $and: [
          {
            "status.short": { $in: ["Q1", "Q2", "Q3", "Q4", "OT", "BT", "HT"] },
            showLiveIcon: true,
          },
        ],
      },
      {
        $and: [
          {
            date: { $gte: from, $lte: to },
            "status.short": "FT",
            showLiveIcon: true,
          },
        ],
      },
    ],
  };
  return await BasketBall.paginate(filter, options);
};

const fetchbasketBalllOtherFixture = async (options) => {
  let from = new Date();
  from = new Date(from.setDate(from.getDate() - 2));
  let excludeDate = new Date(new Date().setHours(new Date().getHours() - 4));
  let to = new Date();
  to = new Date(to.setDate(to.getDate() + 5));
  filter = {
    $or: [
      {
        $and: [
          {
            "status.short": {
              $in: ["NS", "FT", "AOT", "POST", "CANC", "SUSP"],
            },
            showLiveIcon: false,
          },
        ],
      },
      {
        $and: [
          {
            $or: [
              {
                date: { $gte: from, $lte: excludeDate },
                showLiveIcon: false,
              },
            ],
            $or: [
              {
                date: { $gte: excludeDate, $lte: to },
                showLiveIcon: false,
              },
            ],
          },
        ],
      },
    ],
  };
  return await BasketBall.paginate(filter, options);
};

/**
 *
 * @param {*} id
 * @returns
 */
const fetchFixtureByLeaugeId = async (options) => {
  const filter = { "league.id": Number(options.id) };
  return await BasketBall.paginate(filter, options);
};
const fetchStandingsByLeaugeId = async (query) => {
  const year = new Date().getFullYear();
  query.season = `${year}-${year + 1}`;
  const options = {
    method: "GET",
    url: "https://api-basketball.p.rapidapi.com/standings",
    params: query,
    headers: {
      "X-RapidAPI-Key": config.ripidBasketballApi.key,
      "X-RapidAPI-Host": config.ripidBasketballApi.host,
    },
  };
  const response = await axios(options);
  return response.data;
};

const fetchMatchByFixtureId = async (query) => {
  const filter = { _id: Number(query.id) };
  const fixture = await BasketBall.findOne(filter);
  if (!fixture) throw new ApiError(httpStatus.BAD_REQUEST, "No fixture found!");
  return fixture;
};
module.exports = {
  fetchBasketballLeauges,
  fetchBasketBallLiveFixtures,
  fetchbasketBalllOtherFixture,
  fetchStandingsByLeaugeId,
  fetchFixtureByLeaugeId,
  fetchMatchByFixtureId,
};
