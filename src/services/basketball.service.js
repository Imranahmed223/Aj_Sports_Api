const config = require("../config/config");
const { default: axios } = require("axios");

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
      console.log("Yes");
      newData.push({
        leauge: data.response[i],
      });
    }
  }
  data.response = newData;
  data.results = data.response.length;
  return data;
};

const fetchGamesByLeaugeId = async (query) => {
  const year = new Date().getFullYear();
  query.season = `${year}-${year + 1}`;
  const options = {
    method: "GET",
    url: "https://api-basketball.p.rapidapi.com/games",
    params: query,
    headers: {
      "X-RapidAPI-Key": config.ripidBasketballApi.key,
      "X-RapidAPI-Host": config.ripidBasketballApi.host,
    },
  };
  const response = await axios(options);
  return response.data;
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
module.exports = {
  fetchBasketballLeauges,
  fetchGamesByLeaugeId,
  fetchStandingsByLeaugeId,
};
