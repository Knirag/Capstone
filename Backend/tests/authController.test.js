const pool = require("../config/db");
const request = require("supertest");
const app = require("../app");
describe("Auth Controller", () => {
  let token;

  beforeAll(async () => {
    require("dotenv").config(); 
    // Ensure the test user exists by signing them up
    await request(app).post("/api/auth/signup").send({
      username: "testuser",
      email: "testuser@example.com",
      phone_number: "1234567890",
      password: "password123",
      location_id: 1,
    });
  });

  it("should login an existing user and return a token", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "password123",
    });

    // Validate the login response
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    token = response.body.token; 
  });
  afterAll(async () => {
    if (pool) await pool.end(); 
  });

});
