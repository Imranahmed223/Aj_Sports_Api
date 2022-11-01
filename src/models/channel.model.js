const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const channelSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
channelSchema.plugin(toJSON);
channelSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} name - The user's email
 * @param {ObjectId} [channelId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
channelSchema.statics.isChannelExists = async function (name) {
  const channel = await this.findOne({ name });
  return !!channel;
};

/**
 * @typedef User
 */
const Channel = mongoose.model("Channel", channelSchema);

module.exports = Channel;
