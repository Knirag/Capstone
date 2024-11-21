const redisClient = require("./redis");

/**
 * Check if an action is rate-limited.
 * @param {string} key - The Redis key to track rate limit.
 * @param {number} limitDuration - Rate limit duration in seconds.
 * @returns {boolean} - True if rate-limited, false otherwise.
 */
const isRateLimited = async (key, limitDuration) => {
  const lastRequestTime = await redisClient.get(key);

  if (lastRequestTime) {
    return true; // User is rate-limited
  }

  // Set rate-limit key
  await redisClient.setEx(key, limitDuration, "true");
  return false;
};

module.exports = { isRateLimited };
