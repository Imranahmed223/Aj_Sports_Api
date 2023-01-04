const { default: mongoose } = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const boxingPlayersSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    born: {
      type: Date,
      default: null,
    },
    age: {
      type: Number,
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
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
boxingPlayersSchema.plugin(toJSON);
boxingPlayersSchema.plugin(paginate);

/**
 * @typedef BoxingPlayer
 */
const BoxingPlayer = mongoose.model("BoxingPlayer", boxingPlayersSchema);

module.exports = BoxingPlayer;
