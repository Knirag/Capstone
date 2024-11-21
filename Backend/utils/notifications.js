const { Expo } = require("expo-server-sdk");

let expo = new Expo();

const sendNotification = async (users, title, body) => {
  console.log("Retrieved users for notifications:", users);

  const messages = [];
  for (const user of users) {
    const token = user.push_token; // Ensure it matches the field in your DB schema
    if (!token || !Expo.isExpoPushToken(token)) {
      console.error(`Push token ${token} is not a valid Expo push token`);
      continue;
    }

    messages.push({
      to: token,
      sound: "default",
      title,
      body,
    });
  }

  const expo = new Expo();
  const chunks = expo.chunkPushNotifications(messages);

  for (const chunk of chunks) {
    try {
      await expo.sendPushNotificationsAsync(chunk);
    } catch (error) {
      console.error("Error sending push notifications:", error);
    }
  }
};

module.exports = { sendNotification };
