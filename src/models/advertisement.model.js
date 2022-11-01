const { default: mongoose } = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const advertismentSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      required: true,
    },
    priority: {
      type: Number,
      required: true,
    },
    photoPath: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

advertismentSchema.index({ text: "text" });

// add plugin that converts mongoose to json
advertismentSchema.plugin(toJSON);
advertismentSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
advertismentSchema.statics.isPriorityTaken = async function (priority) {
  const adver = await this.findOne({ priority });
  return !!adver;
};

/**
 * @typedef Advertisment
 */
const Advertisment = mongoose.model("Advertisment", advertismentSchema);

module.exports = Advertisment;
