const request = require("supertest");
const app = require("../app");
const pool = require("../config/db");

let userToken;

beforeAll(async () => {
  require("dotenv").config();

  // Log in to get a token
  const response = await request(app).post("/api/admin/login").send({
    email: "admin@example.com",
    password: "adminpassword",
  });

  userToken = response.body.token;
  console.log("Generated Admin Token:", userToken);
});

describe("Functional and System Testing", () => {
  it("should allow a logged-in user to create and retrieve an event", async () => {
    const createResponse = await request(app)
      .post("/api/events")
      .send({
        title: "Test Event",
        description: "This is a test event",
        event_date: "2024-01-01 10:00:00",
        location_id: 1,
      })
      .set("Authorization", `Bearer ${userToken}`);

    console.log("Create Response:", createResponse.body); // Debug create response
    expect(createResponse.status).toBe(201);
    expect(createResponse.body.message).toBe("Event created successfully");

    const eventId = createResponse.body.eventId;
    console.log("Created Event ID:", eventId); // Log created event ID

    const retrieveResponse = await request(app)
      .get(`/api/events/event/${eventId}`)
      .set("Authorization", `Bearer ${userToken}`);

    console.log("Retrieve Response:", retrieveResponse.body); // Debug retrieve response
    console.log("Retrieve Status Code:", retrieveResponse.status); // Debug status code
    expect(retrieveResponse.status).toBe(200); // Ensure retrieval success
    expect(retrieveResponse.body.title).toBe("Test Event"); // Validate event title
  });
});
afterAll(async () => {
  console.log("Cleaning up test data...");
  try {
    // Delete test events
    await pool.query("DELETE FROM events WHERE title LIKE 'Test Event%'");
    console.log("Cleanup completed.");
  } catch (error) {
    console.error("Error during cleanup:", error);
  } finally {
    await pool.end();
  }
});
