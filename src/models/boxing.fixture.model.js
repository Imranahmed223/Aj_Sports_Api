const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const boxingFixtureSchema = mongoose.Schema({
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
    challenger: {
      type: mongoose.Types.ObjectId,
      ref: "BoxingPlayer",
      required: true,
    },
    defnender: {
      type: mongoose.Types.ObjectId,
      ref: "BoxingPlayer",
      required: true,
    },
  },
  winner: {
    type: mongoose.Types.ObjectId,
    ref: "BoxingPlayer",
    default: null,
  },
});

// add plugin that converts mongoose to json
boxingFixtureSchema.plugin(toJSON);
boxingFixtureSchema.plugin(paginate);

/**
 * @typedef BoxingFixture
 */
const BoxingFixture = mongoose.model("BoxingFixture", boxingFixtureSchema);

module.exports = BoxingFixture;
