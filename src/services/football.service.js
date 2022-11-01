const config = require("../config/config");
const { default: axios } = require("axios");
const footballData = require("../../football_data");

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
/**
 *
 * @param {*} params
 * @returns {Array<Response>}
 */
const fetchFixtureByLeaugesId = async (query) => {
  console.log(query);
  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
    params: query,
    headers: {
      "X-RapidAPI-Key": config.ripidFootballApi.key,
      "X-RapidAPI-Host": config.ripidFootballApi.host,
    },
  };

  const response = await axios(options);
  return response.data;
};

const fetchMatchByFixtureId = async (id) => {
  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
    params: id,
    headers: {
      "X-RapidAPI-Key": config.ripidFootballApi.key,
      "X-RapidAPI-Host": config.ripidFootballApi.host,
    },
  };
  const response = await axios(options);
  return response.data;
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

module.exports = {
  fetchAllLeauges,
  fetchFixtureByLeaugesId,
  fetechLinupOfFixture,
  fetchMatchByFixtureId,
  fetchStandingsByLeaugeId,
};
