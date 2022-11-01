const { default: mongoose } = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const notificationSchema = mongoose.Schema(
  {
    edit_history_tweet_ids: {
      type: Array,
      default: [],
    },
    tweet_id: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
notificationSchema.plugin(toJSON);
notificationSchema.plugin(paginate);

/**
 * @typedef Notification
 */
const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
