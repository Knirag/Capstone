const { createClient } = require("redis");

let redisClient;

const connectRedis = async () => {
  if (!redisClient) {
    redisClient = createClient();
    try {
      await redisClient.connect();
      console.log("Connected to Redis");
    } catch (error) {
      console.error("Error connecting to Redis:", error);
    }
  }
  return redisClient;
};

const disconnectRedis = async () => {
  if (redisClient) {
    await redisClient.quit();
    console.log("Disconnected from Redis");
  }
};

module.exports = { connectRedis, disconnectRedis };
