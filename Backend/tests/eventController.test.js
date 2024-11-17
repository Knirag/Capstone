const request = require("supertest");
const pool = require("../config/db");
const app = require("../app");
const { generateToken } = require("../utils/jwtHelper");
describe("Event Controller", () => {
  let token;

  beforeAll(async () => {
    require("dotenv").config(); 
    console.log("Creating admin user...");

    // Sign up the admin user
    const signupResponse = await request(app).post("/api/admin/signup").send({
      id: 1,
      username: "adminuser",
      email: "admin@example.com",
      password: "adminpassword",
      role: "district",
      location_id: 1,
    });

    console.log("Signup response:", signupResponse.body);

    // Login to get the token
    const loginResponse = await request(app).post("/api/admin/login").send({
      email: "admin@example.com",
      password: "adminpassword",
    });

    token = loginResponse.body.token;
    console.log("Generated token:", token);

    // Verify the token contains necessary data
    try {
      const tokenData = JSON.parse(atob(token.split(".")[1]));
      console.log("Token payload:", tokenData);
    } catch (error) {
      console.log("Error decoding token:", error);
    }
  });

  it("should create a new event", async () => {
    const eventData = {
      title: "Test Event",
      description: "This is a test event",
      event_date: "2024-12-01 15:00:00",
      location_id: 1,
    };

    console.log("Attempting to create event with token:", token);
    const response = await request(app)
      .post("/api/events")
      .set("Authorization", `Bearer ${token}`)
      .send(eventData);

    console.log("Create Event API Response:", response.body);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Event created successfully");
  });

  it("should retrieve events by location", async () => {
    // Create an event first
    const createEventResponse = await request(app)
      .post("/api/events")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Event for Retrieval",
        description: "This is another test event",
        event_date: "2024-12-02T15:00:00Z",
        location_id: 1,
      });

    console.log("Create Event Response:", createEventResponse.body);

    // Retrieve events for location_id 1
    const response = await request(app)
      .get("/api/events/1") // Matches route definition
      .set("Authorization", `Bearer ${token}`); // Add token for auth

    console.log("Retrieve Events API Response:", response.body);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Add cleanup after all tests
    afterAll(async () => {
      console.log("Cleaning up test data...");
      try {
        // Delete test events
        await pool.query("DELETE FROM events WHERE location_id = ?", [1]);

        // Delete test admin user
        await pool.query("DELETE FROM users WHERE email = ?", [
          "admin@example.com",
        ]);

        console.log("Cleanup completed.");
      } catch (error) {
        console.error("Error during cleanup:", error);
      } finally {
        // Close the database connection
        await pool.end();
      }
    });

});
