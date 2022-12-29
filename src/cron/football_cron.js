const config = require("../config/config");
const { default: axios } = require("axios");
const footballData = require("../../football_data");
const { Football } = require("../models");
const getFootballFixtures = async () => {
  const leagues = await filterFootballLeauges();
  for (var i = 0; i < leagues.length; i++) {
    const query = setFootballFixtureParameters(leagues[i]);

    const data = await fetchMatchByFixtureId(query);
    if (data.results > 0) {
      const bulkOperations = data.response.map((d) => ({
        updateOne: {
          filter: { "fixture.id": d.fixture.id },
          update: { $set: d },
          upsert: true,
        },
      }));

      await Football.bulkWrite(bulkOperations);
    }
  }
};

const filterFootballLeauges = async () => {
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
  const leauges = [];
  for (let i = 0; i < data.response.length; i++) {
    footballData.forEach((f) => {
      if (
        f.name.toLocaleLowerCase() ==
          data.response[i].league.name.toLowerCase() &&
        f.country.toLocaleLowerCase() ==
          data.response[i].country.name.toLowerCase()
      ) {
        leauges.push(data.response[i].league.id);
      }
    });
  }
  return leauges;
};

const setFootballFixtureParameters = (league) => {
  const query = { league };
  let from = new Date();
  from = new Date(from.setDate(from.getDate() - 7));
  let to = new Date();
  to = new Date(to.setDate(to.getDate() + 7));
  query.from = from.toISOString().split("T")[0];
  query.to = to.toISOString().split("T")[0];
  query.season = from.getFullYear();
  query.status = "NS-1H-HT-2H-ET-P-BT-LIVE-FT-AET-PEN-BT-AWD";
  return query;
};

const fetchMatchByFixtureId = async (query) => {
  //   console.log(query);
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
  //   console.log(response);
  return response.data;
};
module.exports = {
  getFootballFixtures,
};
