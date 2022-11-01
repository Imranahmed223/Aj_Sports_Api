const config = require("../config/config");
const { Notification } = require("../models");
const { Client } = require("twitter-api-sdk");
const logger = require("../config/logger");
const fetchTweets = async () => {
  let userId;
  const client = new Client(config.twitter.bearerToken);
  const response = await client.users.findUserByUsername("ajsportstv");
  userId = response.data.id;

  var end_time = new Date().toISOString();
  var start_time = new Date(
    new Date().setHours(new Date().getHours() - 1)
  ).toISOString();
  const tweets = await client.tweets
    .usersIdTweets(userId, {
      start_time,
      end_time,
    })
    .then()
    .catch((err) => console.log(err.error));
  if (tweets.meta.result_count > 0) {
    const results = createTweetsAndReetweets(tweets.data);
    results
      .then((res) => {
        logger.info(res);
        logger.info("Data inserted");
      })
      .catch((err) => {
        logger.error(err);
      });
  }
  return;
};
const createTweetsAndReetweets = (tweets) => {
  return new Promise((resolve, reject) => {
    tweets.forEach(async function (tweet) {
      await Notification.updateOne(
        { tweet_id: tweet.id },
        {
          $set: {
            edit_history_tweet_ids: tweet.edit_history_tweet_ids,
            tweet_id: tweet.id,
            text: tweet.text,
          },
        },
        { upsert: true }
      );
      // console.log(insert.explain());
    });
    resolve();
  });
};

module.exports = fetchTweets;
