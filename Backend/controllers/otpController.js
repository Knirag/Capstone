const { sendOTP } = require("../utils/twilio");
const redisClient = require("../utils/redis");
const { isRateLimited } = require("../utils/rateLimiter");

const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString(); // Generate 4-digit OTP

const OTP_EXPIRATION = 300; // OTP expires in 5 minutes
const OTP_RATE_LIMIT = 3600; // 1 OTP per hour for the same user/phone

// Request OTP
exports.requestOTP = async (req, res) => {
  const { phone_number } = req.body;

  if (!phone_number) {
    return res.status(400).json({ message: "Phone number is required." });
  }

   try {
     // Check rate limit
     const rateLimitKey = `otp-rate-limit:${phone_number}`;
     const isLimited = await isRateLimited(rateLimitKey, OTP_RATE_LIMIT);

     if (isLimited) {
       return res.status(429).json({
         message: "OTP already requested. Please wait before trying again.",
       });
     }

     // Generate and store OTP
     const otp = generateOTP();
     console.log("Generated OTP:", otp); // For debugging, remove in production
    await redisClient.setEx(`otp:${phone_number}`, OTP_EXPIRATION, otp);
    console.log("Stored OTP:", await redisClient.get(`otp:${phone_number}`));

     // Set rate limit key
     await redisClient.setEx(
       `otp-rate-limit:${phone_number}`,
       OTP_RATE_LIMIT,
       "true"
     );

     // Send OTP via Twilio
     await sendOTP(phone_number, otp);

     res.status(200).json({ message: "OTP sent successfully." });
   } catch (error) {
     console.error("Error requesting OTP:", error);
     res.status(500).json({ message: "Failed to send OTP." });
   }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  const { phone_number, otp } = req.body;

  if (!phone_number || !otp) {
    return res
      .status(400)
      .json({ message: "Phone number and OTP are required." });
  }

  const storedOTP = await redisClient.get(phone_number);

  if (!storedOTP) {
    return res.status(400).json({ message: "Expired OTP." });
  }

  if (storedOTP !== otp) {
    return res.status(400).json({ message: "Invalid OTP." });
  }

  // Clear OTP after verification
  await redisClient.del(phone_number);
  res.status(200).json({ message: "OTP verified successfully." });
};
