const admin = require("firebase-admin");
const serviceAccount = require("./crw-app-23fec-firebase-adminsdk-sglad-4cd421c5ae.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
