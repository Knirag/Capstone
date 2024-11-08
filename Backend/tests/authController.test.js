const request = require("supertest");
const app = require("../app");

describe("Auth Controller", () => {
  let token;

  it("should sign up a new user", async () => {
    const response = await request(app).post("/api/auth/signup").send({
      username: "testuser",
      email: "testuser@example.com",
      phone_number: "1234567890",
      password: "password123",
    });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User created successfully");
  });

  it("should login an existing user and return a token", async () => {
    const response = await request(app).post("/api/auth/login").send({
      username: "testuser",
      password: "password123",
    });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    token = response.body.token; // Save token for further tests
  });
});
