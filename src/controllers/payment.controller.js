const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const {} = require("../services");
const config = require("../config/config");
const stripe = require("stripe")(config.strip.secretKey);
var paypal = require("paypal-node-sdk");
const { Transaction } = require("../models");
const { v4: uuidv4 } = require("uuid");
const CoinqvestClient = require("coinqvest-merchant-sdk");

const checkoutWithStripe = catchAsync(async (req, res) => {
  const { number, exp_month, exp_year, cvc, amount, cardHolderName } = req.body;
  const token = await stripe.tokens.create({
    card: {
      number: String(number),
      exp_month: Number(exp_month),
      exp_year: Number(exp_year),
      cvc: String(cvc),
    },
  });
  try {
    const customer = await stripe.customers.create({
      name: cardHolderName,
      source: token.id,
    });
    const charge = await stripe.charges.create({
      amount: amount * 100,
      currency: "gbp",
      customer: customer.id,
      description: `Service donation`,
    });
    console.log(charge);
    res.status(httpStatus.OK).json({ msg: "Donation recieved successfully!" });
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ msg: "payment failed" });
  }
});

const checkoutWithPaypal = catchAsync(async (req, res) => {
  paypal.configure({
    mode: "sandbox", //sandbox or live
    client_id: config.paypal.paypalClientId,
    client_secret: config.paypal.paypalClientSeecret,
  });
  try {
    const newPayment = createPaypalPayment(req.body.amount);
    paypal.payment.create(newPayment, async function (error, payment) {
      if (error) {
        console.log(JSON.stringify(error));
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === "approval_url") {
            await Transaction.create({
              paymentId: payment.id,
              source: "Paypal",
              transactionUrl: payment.links[i].href,
              amount: req.body.amount,
              paid: false,
            });
            res.json({ data: payment.links[i].href });
          }
        }
      }
    });
  } catch (error) {
    console.log(error);
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Something went wrong!"
    );
  }
});

const paypalCheckoutSuccess = catchAsync(async (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;
  const transaction = await Transaction.findOne({ paymentId });
  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "GBP",
          total: transaction.amount,
        },
      },
    ],
  };
  try {
    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      async function (error, payment) {
        if (error) {
          console.log(error.response);
          throw error;
        } else {
          transaction.paid = true;
          await transaction.save();
          res.send("Your donation has been recieved successfully.");
        }
      }
    );
  } catch (error) {
    res.send("Oops, donation failed!");
  }
});

const paypalCancelCheckout = catchAsync(async (req, res) => {
  return res.send("Oops! Something went wrong try again later");
});

const createPaypalPayment = (amount) => {
  var newPayment = {
    intent: "authorize",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: config.paypal.returnUrl,
      cancel_url: config.paypal.cancelUrl,
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              sku: "donation",
              price: amount,
              currency: "GBP",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "GBP",
          total: amount,
        },
        description: `Donation amount for Ajs sport tv`,
      },
    ],
  };
  return newPayment;
};

const checkoutWithCrypto = catchAsync(async (req, res) => {
  const {
    amount,
    firstname,
    email,
    lastname,
    company,
    zip,
    adr1,
    adr2,
    city,
    countrycode,
  } = req.body;
  const client = new CoinqvestClient(
    config.coinqvest.key,
    config.coinqvest.secret
  );
  let response = await client.post("/customer", {
    customer: {
      email: email,
      firstname: firstname,
      lastname: lastname,
      company: company,
      adr1: adr1,
      adr2: adr2,
      zip: zip,
      city: city,
      countrycode: countrycode,
    },
  });
  const customerId = response.data["customerId"];
  response = await client.post("/checkout/hosted", {
    charge: {
      customerId: customerId,
      billingCurrency: "USD",
      lineItems: [
        {
          description: "Ajs sport tv donation amount!",
          netAmount: amount,
          quantity: 1,
        },
      ],
    },
    settlementAsset:
      "USDC:GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN",
  });

  if (response.status !== 200) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Could done operation, please try again later!"
    );
  }
  let url = response.data["url"];
  res.send(url);
});

const cryptoCheckoutSuccess = catchAsync(async (req, res) => {
  // let response = await client.get("/checkout", { id: checkoutId });

  // console.log(response.status);
  // console.log(response.data);

  // if (response.status === 200) {
  //   let state = response.data["checkout"]["state"];
  //   if (state === "CHECKOUT_COMPLETED") {
  //     console.log(
  //       "The payment has completed and your account was credited. You can now ship the goods."
  //     );
  //   } else {
  //     // try again in 30 seconds or so...
  //   }
  // }
  res.send("Your donation has been recieved successfully.");
});
const cryptoCheckoutFailed = catchAsync(async (req, res) => {
  return res.send("Oops! Something went wrong try again later");
});
module.exports = {
  checkoutWithStripe,
  paypalCancelCheckout,
  paypalCheckoutSuccess,
  checkoutWithPaypal,
  checkoutWithCrypto,
  cryptoCheckoutFailed,
  cryptoCheckoutSuccess,
};
