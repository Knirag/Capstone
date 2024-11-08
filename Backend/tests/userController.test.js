const request = require("supertest");
const app = require("../app");

let token;

beforeAll(async () => {
  const loginResponse = await request(app).post("/api/auth/login").send({
    username: "testuser",
    password: "password123",
  });
  token = loginResponse.body.token; // Save the token
});

describe("User Controller", () => {
  test("should update user information", async () => {
    const response = await request(app)
      .put("/api/users/1")
      .send({ username: "newUsername" })
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.user.username).toBe("newUsername");
  });
});
