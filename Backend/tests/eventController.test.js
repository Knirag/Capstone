// __tests__/eventController.test.js
const request = require("supertest");
const app = require("../app");

describe("Event Controller", () => {
  let adminToken;

  beforeAll(async () => {
    const loginResponse = await request(app).post("/api/admin/login").send({
      username: "adminuser",
      password: "adminpassword123",
    });
    adminToken = loginResponse.body.token;
  });

  it("should create a new event", async () => {
    const response = await request(app)
      .post("/api/events")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Test Event",
        description: "This is a test event",
        event_date: "2024-12-01T15:00:00Z",
        location_id: 1,
      });
    expect(response.status).toBe(201);
    expect(response.body.event.title).toBe("Test Event");
  });

  it("should retrieve events by location", async () => {
    const response = await request(app).get("/api/events/1");
    expect(response.status).toBe(200);
    expect(response.body.events).toBeInstanceOf(Array);
  });
});
