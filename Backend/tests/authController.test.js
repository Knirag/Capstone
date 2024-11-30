const bcrypt = require("bcryptjs");
const request = require("supertest");
const pool = require("../config/db");
const app = require("../app");
const { sendOTP, verifyOTP } = require("../utils/twilio");

jest.mock("../utils/twilio", () => ({
  sendOTP: jest.fn(() => Promise.resolve("Mock OTP sent")),
  verifyOTP: jest.fn((phoneNumber, otp) =>
    Promise.resolve(otp === "123456" ? { status: "approved" } : null)
  ),
}));

let testLocationId;
let userToken;

beforeAll(async () => {
  // Create test location
  await pool.query(
    `INSERT INTO locations (id, name, level) VALUES (UUID(), 'Test Location', 'cell')`
  );

  const [locationResult] = await pool.query(
    `SELECT id FROM locations WHERE name = 'Test Location' LIMIT 1`
  );
  testLocationId = locationResult[0].id;

  // Create test user
  const hashedPassword = await bcrypt.hash("password123", 10);
  await pool.query(
    `INSERT INTO users (id, username, email, phone_number, password, location_id) 
     VALUES (UUID(), 'testuser', 'testuser@example.com', '1234567890', ?, ?)`,
    [hashedPassword, testLocationId]
  );
});

afterAll(async () => {
  await pool.query(`DELETE FROM users WHERE email = 'testuser@example.com'`);
  await pool.query(`DELETE FROM users WHERE email = 'newuser@example.com'`);
  await pool.query(`DELETE FROM locations WHERE name = 'Test Location'`);
  await pool.end();
});

describe("Auth Controller - User Authentication", () => {
  it("should signup a new user successfully", async () => {
    const response = await request(app).post("/api/auth/signup").send({
      username: "newuser",
      email: "newuser@example.com",
      phone_number: "1234567890", // Ensure this matches the mock
      password: "password123",
      location_id: testLocationId,
      home_address: "123 Street Name",
    });

    // Ensure sendOTP was called
    expect(sendOTP).toHaveBeenCalled();
    expect(sendOTP).toHaveBeenCalledWith("1234567890");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "OTP sent successfully. Please verify to complete signup."
    );
  });


  it("should login an existing user and return a token", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Login successful");
    expect(response.body.token).toBeDefined();
    userToken = response.body.token;
  });

  it("should deny login for invalid credentials", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "invalid@example.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Invalid email or password."
    );
  });
});
