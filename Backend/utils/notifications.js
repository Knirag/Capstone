const { Expo } = require("expo-server-sdk");

const expo = new Expo();

const sendNotification = async (pushTokens, title, message, data = {}) => {
  const messages = [];

  for (let pushToken of pushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Invalid Expo push token: ${pushToken}`);
      continue;
    }

    messages.push({
      to: pushToken,
      sound: "default",
      title,
      body: message,
      data,
    });
  }

  const chunks = expo.chunkPushNotifications(messages);

  try {
    const tickets = [];
    for (let chunk of chunks) {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    }
    console.log("Push notification tickets:", tickets);
  } catch (error) {
    console.error("Error sending push notifications:", error);
  }
};

module.exports = { sendNotification };
