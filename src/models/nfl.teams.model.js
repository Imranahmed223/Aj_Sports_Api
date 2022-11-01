const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const nflTeamsSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  logo: {
    type: String,
    default: null,
  },
  players: [
    {
      _id: false,
      name: {
        type: String,
      },
    },
  ],
});

// add plugin that converts mongoose to json
nflTeamsSchema.plugin(toJSON);
nflTeamsSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} name - The user's email
 * @returns {Promise<boolean>}
 */
nflTeamsSchema.statics.isNameTaken = async function (name) {
  const team = await this.findOne({ name });
  return !!team;
};

/**
 * @typedef NFLTeams
 */
const NFLTeams = mongoose.model("NFLTeams", nflTeamsSchema);

module.exports = NFLTeams;
