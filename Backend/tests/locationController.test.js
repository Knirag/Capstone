const request = require("supertest");
const app = require("../app");

describe("Location Controller", () => {
  it("should retrieve all locations", async () => {
    const response = await request(app).get("/api/locations");
    expect(response.status).toBe(200);
    expect(response.body.locations).toBeInstanceOf(Array);
  });
});
