const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const footbalSchema = mongoose.Schema(
  {
    showLiveIcon: {
      type: Boolean,
      default: false,
    },
    fixture: {
      id: {
        type: Number,
        default: null,
      },
      referee: {
        type: String,
        default: null,
      },
      timezone: {
        type: String,
        default: "UTC",
      },
      date: {
        type: Date,
        default: null,
      },
      timestamp: {
        type: Number,
        default: null,
      },
      periods: {
        first: {
          type: Number,
          default: null,
        },
        second: {
          type: Number,
          default: null,
        },
      },
      venue: {
        id: {
          type: Number,
          default: null,
        },
        name: {
          type: String,
          default: null,
        },
        city: {
          type: String,
          default: null,
        },
      },
      status: {
        long: {
          type: String,
          default: null,
        },
        short: {
          type: String,
          default: null,
        },
        elapsed: {
          type: Number,
          default: null,
        },
      },
    },
    league: {
      id: {
        type: Number,
        default: null,
      },
      name: {
        type: String,
        default: null,
      },
      country: {
        type: String,
        default: null,
      },
      logo: {
        type: String,
        default: null,
      },
      flag: {
        type: String,
        default: null,
      },
      season: {
        type: Number,
        default: null,
      },
      round: {
        type: String,
        default: null,
      },
    },
    teams: {
      home: {
        id: {
          type: Number,
          default: null,
        },
        name: {
          type: String,
          default: null,
        },
        logo: {
          type: String,
          default: null,
        },
        winner: {
          type: Boolean,
          default: null,
        },
      },
      away: {
        id: {
          type: Number,
          default: null,
        },
        name: {
          type: String,
          default: null,
        },
        logo: {
          type: String,
          default: null,
        },
        winner: {
          type: Boolean,
          default: null,
        },
      },
    },
    goals: {
      home: {
        type: Number,
        default: null,
      },
      away: {
        type: Number,
        default: null,
      },
    },
    score: {
      halftime: {
        home: {
          type: Number,
          default: null,
        },
        away: {
          type: Number,
          default: null,
        },
      },
      fulltime: {
        home: {
          type: Number,
          default: null,
        },
        away: {
          type: Number,
          default: null,
        },
      },
      extratime: {
        home: {
          type: Number,
          default: null,
        },
        away: {
          type: Number,
          default: null,
        },
      },
      penalty: {
        home: {
          type: Number,
          default: null,
        },
        away: {
          type: Number,
          default: null,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

footbalSchema.index({ "fixture.date": 1, "fixture.date": -1 });
/**
 * create Text string for title
 */
// footbalSchema.index({ title: "text" });

footbalSchema.plugin(toJSON);
footbalSchema.plugin(paginate);
/**
 * @typedef Football
 */
const Football = mongoose.model("Football", footbalSchema);

module.exports = Football;
