const twilio = require("twilio");
const client = twilio("ACCOUNT_SID", "AUTH_TOKEN");

exports.sendOtp = async (req, res) => {
  const { phoneNumber } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);

  await client.messages.create({
    body: `Your OTP is ${otp}`,
    from: "YOUR_TWILIO_NUMBER",
    to: phoneNumber,
  });
  // Save OTP in database if needed for verification
  res.status(200).json({ message: "OTP sent successfully" });
};

exports.verifyOtp = (req, res) => {
  const { otp, userOtp } = req.body;
  if (otp === userOtp) {
    res.status(200).json({ message: "OTP Verified" });
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
};
