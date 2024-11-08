const request = require("supertest");
const app = require("../app");

describe("Notification Controller", () => {
  let adminToken;

  beforeAll(async () => {
    const loginResponse = await request(app).post("/api/admin/login").send({
      username: "adminuser",
      password: "adminpassword123",
    });
    adminToken = loginResponse.body.token;
  });

  it("should create a new notification", async () => {
    const response = await request(app)
      .post("/api/notifications")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Test Notification",
        description: "This is a test notification",
        date: "2024-10-17T12:00:00Z",
        location_id: 1,
      });
    expect(response.status).toBe(201);
    expect(response.body.notification.title).toBe("Test Notification");
  });

  it("should retrieve notifications by location", async () => {
    const response = await request(app).get("/api/notifications/1");
    expect(response.status).toBe(200);
    expect(response.body.notifications).toBeInstanceOf(Array);
  });
});
