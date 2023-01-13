const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const transactionsSchema = mongoose.Schema(
  {
    customerId: {
      type: String,
      default: null,
    },
    checkoutId: {
      type: String,
      default: null,
    },
    source: {
      type: String,
      required: true,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    paymentId: {
      type: String,
      required: true,
    },
    paymentToken: { type: String, default: "" },
    transactionUrl: {
      type: String,
      default: "",
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

transactionsSchema.plugin(toJSON);
transactionsSchema.plugin(paginate);
/**
 * @typedef Transaction
 */
const Transaction = mongoose.model("Transaction", transactionsSchema);

module.exports = Transaction;
