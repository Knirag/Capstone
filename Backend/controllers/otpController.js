const sendOtp = (client) => async (req, res) => {
  try {
    const { phone_number } = req.body;

    if (!phone_number) {
      return res.status(400).json({ message: "Phone number is required." });
    }

    const result = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({ to: phone_number, channel: "sms" });

    res
      .status(200)
      .json({ message: "OTP sent successfully via Twilio.", result });
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    res.status(500).json({ message: "Failed to send OTP." });
  }
};

const verifyOtp = (client) => async (req, res) => {
  try {
    const { phone_number, otp } = req.body;

    if (!phone_number || !otp) {
      return res
        .status(400)
        .json({ message: "Phone number and OTP are required." });
    }

    const result = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({ to: phone_number, code: otp });

    if (result.status === "approved") {
      res.status(200).json({ message: "OTP verified successfully." });
    } else {
      res.status(400).json({ message: "Invalid OTP." });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error.message);
    res.status(500).json({ message: "Failed to verify OTP." });
  }
};

module.exports = { sendOtp, verifyOtp };
