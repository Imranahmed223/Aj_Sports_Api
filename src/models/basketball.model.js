const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const basketballSchema = mongoose.Schema(
  {
    category: {
      type: String,
      default: "other",
    },
    _id: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      default: null,
    },
    time: {
      type: String,
      default: "",
    },
    timestamp: {
      type: Number,
      default: null,
    },
    timezone: {
      type: String,
      default: "UTC",
    },
    stage: {
      type: String,
      default: null,
    },
    week: {
      type: String,
      default: null,
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
      timer: {
        type: String,
        default: null,
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
      type: {
        type: String,
        default: null,
      },
      season: {
        type: String,
        default: null,
      },
      logo: {
        type: String,
        default: null,
      },
    },
    country: {
      id: {
        type: Number,
        default: null,
      },
      name: {
        type: String,
        default: null,
      },
      code: {
        type: String,
        default: null,
      },
      flag: {
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
      },
    },
    score: {
      home: {
        quarter_1: {
          type: Number,
          default: null,
        },
        quarter_2: {
          type: Number,
          default: null,
        },
        quarter_3: {
          type: Number,
          default: null,
        },
        quarter_4: {
          type: Number,
          default: null,
        },
        over_time: {
          type: Number,
          default: null,
        },
        total: {
          type: Number,
          default: null,
        },
      },
      away: {
        quarter_1: {
          type: Number,
          default: null,
        },
        quarter_2: {
          type: Number,
          default: null,
        },
        quarter_3: {
          type: Number,
          default: null,
        },
        quarter_4: {
          type: Number,
          default: null,
        },
        over_time: {
          type: Number,
          default: null,
        },
        total: {
          type: Number,
          default: null,
        },
      },
    },
  },
  {
    timestamps: true,
  }
  // { _id: false }
);

basketballSchema.index({ date: 1, date: -1 });
/**
 * create Text string for title
 */
// footbalSchema.index({ title: "text" });

basketballSchema.plugin(toJSON);
basketballSchema.plugin(paginate);
/**
 * @typedef BasketBall
 */
const BasketBall = mongoose.model("BasketBall", basketballSchema);

module.exports = BasketBall;
