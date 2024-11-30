const request = require("supertest");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../config/db");
const app = require("../app");

describe("User Controller", () => {
  let token;
  const testUserId = "test-user-id";
  const testPassword = "securePassword123";

  beforeAll(async () => {
    // Hash the password for the test user
    const hashedPassword = await bcrypt.hash(testPassword, 10);

    // Insert test user
    await pool.query(
      `INSERT INTO users (id, username, email, phone_number, age, location_id, home_address, password) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        testUserId,
        "testUser",
        "test@example.com",
        "123456789",
        30,
        "b23ce48c-aaca-11ef-a1dd-5cfb3a69536a", // Valid location ID
        "123 Test St",
        hashedPassword,
      ]
    );

    // Generate a valid token
    token = jwt.sign(
      { id: testUserId, location_id: "b23ce48c-aaca-11ef-a1dd-5cfb3a69536a" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  });

  afterAll(async () => {
    // Cleanup test data
    await pool.query("DELETE FROM users WHERE id = ?", [testUserId]);
    if (pool) await pool.end();
  });

  it("should update user information successfully with valid data", async () => {
    const response = await request(app)
      .put(`/api/users/${testUserId}`)
      .send({ username: "updatedUser" })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.user).toHaveProperty("username", "updatedUser");
  });

  it("should fail to update user information with invalid location", async () => {
    const response = await request(app)
      .put(`/api/users/${testUserId}`)
      .send({ location_id: "invalid-location-id" })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid location specified.");
  });

  it("should fail with invalid token", async () => {
    const response = await request(app)
      .put(`/api/users/${testUserId}`)
      .send({ username: "updatedUser" })
      .set("Authorization", "Bearer invalid-token");

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Token is not valid");
  });
});
