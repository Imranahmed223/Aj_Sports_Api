const config = require("../config/config");
const { default: axios } = require("axios");
const { BasketBall } = require("../models");
const getBasketBallFixtures = async () => {
  const leagues = await filterBasketlLeauges();
  for (var i = 0; i < leagues.length; i++) {
    const data = await fetchMatchByFixtureLeaugeId(leagues[i]);
    if (data.results > 0) {
      const bulkOperations = data.response.map((d) => ({
        updateOne: {
          filter: { _id: d.id },
          update: { $set: d },
          upsert: true,
        },
      }));

      const writeBuilkResult = await BasketBall.bulkWrite(bulkOperations);
    }
  }
  return true;
};

const filterBasketlLeauges = async () => {
  const options = {
    method: "GET",
    url: "https://api-basketball.p.rapidapi.com/leagues",
    headers: {
      "X-RapidAPI-Key": "6a4ad056c2msh1e4c2d25512d10cp1fc627jsn2fa9f9b54833",
      "X-RapidAPI-Host": "api-basketball.p.rapidapi.com",
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
      newData.push(data.response[i].id);
    }
  }
  console.log("Passed =>>>>> ");
  return newData;
};

const fetchMatchByFixtureLeaugeId = async (league) => {
  const query = {};
  query.league = league;
  const year = new Date().getFullYear();
  query.season = `${year - 1}-${year}`;
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
module.exports = {
  getBasketBallFixtures,
};
