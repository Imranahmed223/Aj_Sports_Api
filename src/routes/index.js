const express = require("express");
const adminRoute = require("./admin.route");
const channelRoute = require("./channel.route");
const adverRoute = require("./advertisment.route");
const newsRoute = require("./news.route");
const footballRoute = require("./football.route");
const basketballRoute = require("./basketball.route");
const nflTeamRoute = require("./nfl.team.route");
const nflFixtureRoute = require("./nfl.fixture.route");
const boxingPlayersRoute = require("./boxing.player.route");
const boxingFixtureRoute = require("./boxing.fixture.route");
const notificationRoute = require("./notification.route");
const router = express.Router();

const defaultRoutes = [
  {
    path: "/v1/admin",
    route: adminRoute,
  },
  {
    path: "/v1/channel",
    route: channelRoute,
  },
  {
    path: "/v1/news",
    route: newsRoute,
  },
  {
    path: "/v1/advertisment",
    route: adverRoute,
  },
  {
    path: "/v1/football",
    route: footballRoute,
  },
  {
    path: "/v1/basketball",
    route: basketballRoute,
  },
  {
    path: "/v1/nfl/team",
    route: nflTeamRoute,
  },
  {
    path: "/v1/nfl/fixture",
    route: nflFixtureRoute,
  },
  {
    path: "/v1/boxing/player",
    route: boxingPlayersRoute,
  },
  {
    path: "/v1/boxing/fixture",
    route: boxingFixtureRoute,
  },
  {
    path: "/v1/notifcation",
    route: notificationRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
