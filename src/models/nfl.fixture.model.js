const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const nflFixtureSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  isLive: {
    type: Boolean,
    default: false,
  },
  venue: {
    name: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
  },
  status: {
    long: {
      type: String,
      default: "",
    },
    elapsed: {
      type: Number,
      default: null,
    },
  },
  teams: {
    away: {
      type: mongoose.Types.ObjectId,
      ref: "NFLTeams",
      required: true,
    },
    home: {
      type: mongoose.Types.ObjectId,
      ref: "NFLTeams",
      required: true,
    },
  },
  goals: {
    away: {
      type: Number,
      default: null,
    },
    home: {
      type: Number,
      default: null,
    },
  },
  winner: {
    type: mongoose.Types.ObjectId,
    ref: "NFLTeams",
    default: null,
  },
});

// add plugin that converts mongoose to json
nflFixtureSchema.plugin(toJSON);
nflFixtureSchema.plugin(paginate);

/**
 * @typedef NFLTFixture
 */
const NFLTFixture = mongoose.model("NFLTFixture", nflFixtureSchema);

module.exports = NFLTFixture;
