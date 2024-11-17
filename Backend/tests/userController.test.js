const request = require("supertest");
const app = require("../app");
const { pool } = require("../config/db");
require("dotenv").config(); 
let token;

beforeAll(async () => {
  require("dotenv").config(); 
  // Login to retrieve a token instead of creating a new user
  const loginResponse = await request(app).post("/api/auth/login").send({
    email: "testuser@example.com",
    password: "password123",
  });

  token = loginResponse.body.token; // Retrieve and save the token
  console.log("Token:", token); // Debugging log for token
});

describe("User Controller", () => {
  it("should update user information", async () => {
    const response = await request(app)
      .put("/api/users/1") // Use the correct user ID
      .send({ username: "newUsername" })
      .set("Authorization", `Bearer ${token}`);

    console.log("User update response:", response.body); // Debugging log
    expect(response.status).toBe(200);
    expect(response.body.user).toHaveProperty("username", "newUsername");
  });
  afterAll(async () => {
    if (pool) await pool.end(); 
  });

});
