const request = require("supertest");
const app = require("../app");
const { pool } = require("../config/db");
require("dotenv").config();

let token;

beforeAll(async () => {
  // Login and retrieve a token
  const loginResponse = await request(app).post("/api/auth/login").send({
    email: "testuser@example.com",
    password: "password123",
  });

  token = loginResponse.body.token;
});

describe("User Controller Validation Testing", () => {
  it("should update user information successfully with valid data", async () => {
    const response = await request(app)
      .put("/api/users/1") // Use the correct user ID
      .send({ username: "newUsername" })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.user).toHaveProperty("username", "newUsername");
  });

  it("should fail to update user information with missing username", async () => {
    const response = await request(app)
      .put("/api/users/1")
      .send({}) // No data sent
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400); // Assuming the API sends a 400 for invalid/missing data
    expect(response.body.message).toBe("Username is required");
  });

  it("should fail with invalid token", async () => {
    const response = await request(app)
      .put("/api/users/1")
      .send({ username: "invalidUsername" })
      .set("Authorization", "Bearer invalidToken");

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Token is not valid");
  });

  afterAll(async () => {
    if (pool) await pool.end();
  });
});
