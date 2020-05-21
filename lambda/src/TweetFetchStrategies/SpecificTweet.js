const settings = require('../../config');
const JsonParser = require('../S3/ResultParsers/JsonParser');
const { logger } = require('../lib/logger');

/**
 * Strategy to fetch a specific tweet by it's id.
 */
class SpecificTweet {
  constructor(tweetId, s3SqlHandler) {
    this.tweetId = tweetId;
    this.s3SqlHandler = s3SqlHandler;
  }

  /**
   * Fetch a specific tweet.
   */
  async fetchTweet() {
    logger.debug('SpecificTweet.fetchTweet');

    const params = {
      Bucket: settings.tweets_s3_bucket,
      Key: settings.tweets_csv_file,
    };

    const tweet = await this.s3SqlHandler.fetchTweetById(this.tweetId, params);

    return new JsonParser(tweet).parse();
  }
}

module.exports = SpecificTweet;
