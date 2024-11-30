const request = require("supertest");
const express = require("express");
const { sendOtp, verifyOtp } = require("../controllers/otpController");
const twilio = require("twilio");

// Mock Twilio client
jest.mock("twilio");

describe("OTP Flow Tests with Twilio Verify", () => {
  const app = express();
  app.use(express.json());

  const testPhoneNumber = "+250788307564";
  const validOtp = "1234";

  let mockCreateVerification, mockCreateVerificationCheck, mockClient;

  beforeAll(() => {
    // Mock Twilio methods
    mockCreateVerification = jest.fn().mockResolvedValue({
      sid: "VA12345",
      to: testPhoneNumber,
      channel: "sms",
      status: "pending",
    });

    mockCreateVerificationCheck = jest.fn((params) => {
      if (params.code === validOtp) {
        return Promise.resolve({ status: "approved" });
      } else {
        return Promise.resolve({ status: "pending" });
      }
    });

    // Mock Twilio client
    mockClient = {
      verify: {
        v2: {
          services: jest.fn(() => ({
            verifications: {
              create: mockCreateVerification,
            },
            verificationChecks: {
              create: mockCreateVerificationCheck,
            },
          })),
        },
      },
    };

    // Inject mocked client into controllers
    app.post("/api/otp/request", sendOtp(mockClient));
    app.post("/api/otp/verify", verifyOtp(mockClient));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should request an OTP and send it via Twilio Verify", async () => {
    const response = await request(app).post("/api/otp/request").send({
      phone_number: testPhoneNumber,
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("OTP sent successfully via Twilio.");
    expect(mockCreateVerification).toHaveBeenCalledWith({
      to: testPhoneNumber,
      channel: "sms",
    });
  });

  it("should verify the OTP successfully via Twilio Verify", async () => {
    const response = await request(app).post("/api/otp/verify").send({
      phone_number: testPhoneNumber,
      otp: validOtp,
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("OTP verified successfully.");
    expect(mockCreateVerificationCheck).toHaveBeenCalledWith({
      to: testPhoneNumber,
      code: validOtp,
    });
  });

  it("should fail to verify an invalid OTP", async () => {
    const response = await request(app).post("/api/otp/verify").send({
      phone_number: testPhoneNumber,
      otp: "0000", // Invalid OTP
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid OTP.");
    expect(mockCreateVerificationCheck).toHaveBeenCalledWith({
      to: testPhoneNumber,
      code: "0000",
    });
  });
});
