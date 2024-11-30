const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendOTP = async (phone_number) => {
  try {
    const verification = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({
        to: phone_number,
        channel: "sms",
      });
    return verification;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};

const verifyOTP = async (phone_number, otp) => {
  try {
    const verificationCheck = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({
        to: phone_number,
        code: otp,
      });
    return verificationCheck;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};

module.exports = { sendOTP, verifyOTP };
