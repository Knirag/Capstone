// utils/notificationSender.js
const admin = require("firebase-admin");
const serviceAccount = require("../path-to-your-firebase-service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const sendPushNotification = async (fcmToken, message) => {
  const payload = {
    notification: {
      title: message.title,
      body: message.body,
    },
    data: message.data || {},
  };

  try {
    await admin.messaging().sendToDevice(fcmToken, payload);
    console.log("Notification sent successfully");
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};

module.exports = { sendPushNotification };
