const request = require("supertest");
const app = require("../app");
const redisClient = require("../utils/redis");
const { sendOTP } = require("../utils/twilio");

// Mock Twilio
jest.mock("../utils/twilio", () => ({
  sendOTP: jest.fn().mockResolvedValue({ sid: "mockSid" }),
}));

describe("OTP Flow Tests", () => {
const testPhoneNumber = `+1234567890-${Date.now()}`;

  beforeAll(async () => {
    if (!redisClient.isOpen) {
      await redisClient.connect(); // Ensure Redis is connected
    }
  });

  afterAll(async () => {
    if (redisClient.isOpen) {
      await redisClient.disconnect(); // Disconnect Redis after all tests
    }
  });

    // Clear Redis keys to ensure clean state
beforeEach(async () => {
  await redisClient.del(testPhoneNumber); // Clear OTP key
  await redisClient.del(`otp_limit:${testPhoneNumber}`); // Clear rate-limiting key
  jest.clearAllMocks();
});

  

  it("should request an OTP and store it in Redis", async () => {
    const response = await request(app)
      .post("/api/otp/request")
      .send({ phoneNumber: testPhoneNumber });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("OTP sent successfully.");

    const otp = await redisClient.get(testPhoneNumber);
    expect(otp).toBeDefined(); // OTP should exist in Redis
    expect(sendOTP).toHaveBeenCalledWith(testPhoneNumber, expect.any(String)); // Verify Twilio was called
  });

  it("should verify the OTP successfully", async () => {
    await redisClient.setEx(testPhoneNumber, 300, "1234");

    const response = await request(app)
      .post("/api/otp/verify")
      .send({ phoneNumber: testPhoneNumber, otp: "1234" });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("OTP verified successfully.");

    const otp = await redisClient.get(testPhoneNumber);
    expect(otp).toBeNull(); // OTP should be removed from Redis
  });

  it("should fail to verify an invalid OTP", async () => {
    await redisClient.setEx(testPhoneNumber, 300, "1234");

    const response = await request(app)
      .post("/api/otp/verify")
      .send({ phoneNumber: testPhoneNumber, otp: "0000" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid OTP.");
  });

  it("should fail to verify an expired OTP", async () => {
    await redisClient.setEx(testPhoneNumber, 1, "1234"); // Expire OTP after 1 second
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Wait for 1.5 seconds

    const response = await request(app)
      .post("/api/otp/verify")
      .send({ phoneNumber: testPhoneNumber, otp: "1234" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Expired OTP.");
  });

  it("should rate-limit OTP requests for the same phone number", async () => {
    await request(app)
      .post("/api/otp/request")
      .send({ phoneNumber: testPhoneNumber });

    const response = await request(app)
      .post("/api/otp/request")
      .send({ phoneNumber: testPhoneNumber });

    expect(response.status).toBe(429);
    expect(response.body.message).toBe(
      "OTP already requested. Please wait before trying again."
    );
  });
});
