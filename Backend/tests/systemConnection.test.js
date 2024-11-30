const request = require("supertest");
const pool = require("../config/db");
const app = require("../app");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwtHelper");

describe("Functional and System Testing", () => {
  let testLocationId, adminToken, adminId;

  beforeAll(async () => {
    console.log("Setting up test data...");

    // Create test location
    testLocationId = "test-location-id";
    await pool.query(
      `INSERT INTO locations (id, name) VALUES (?, 'Test Location')`,
      [testLocationId]
    );

    // Create admin for testing
    adminId = "test-admin-id";
    const hashedPassword = await bcrypt.hash("password123", 10);
    await pool.query(
      `INSERT INTO admins (id, username, email, password, role, location_id)
       VALUES (?, 'testAdmin', 'admin@example.com', ?, 'sectorLeader', ?)`,
      [adminId, hashedPassword, testLocationId]
    );

    // Generate token for admin
    adminToken = generateToken({
      id: adminId,
      role: "sectorLeader",
      location_id: testLocationId,
    });

    console.log("Generated Admin Token:", adminToken);
  });

  afterAll(async () => {
    console.log("Cleaning up test data...");
    await pool.query(`DELETE FROM events WHERE location_id = ?`, [
      testLocationId,
    ]);
    await pool.query(`DELETE FROM admins WHERE id = ?`, [adminId]);
    await pool.query(`DELETE FROM locations WHERE id = ?`, [testLocationId]);
    await pool.end();
    console.log("Cleanup completed.");
  });

  it("should allow an admin to create and retrieve an event", async () => {
    // Create event
    const eventResponse = await request(app)
      .post("/api/events")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Test Event for System",
        description: "System testing event",
        location_id: testLocationId,
        event_date: "2024-12-01",
      });

    console.log("Event Creation Response:", eventResponse.body);
    expect(eventResponse.status).toBe(201);
    expect(eventResponse.body).toHaveProperty(
      "message",
      "Event created successfully."
    );

    // Retrieve the created event
    const eventId = eventResponse.body.event.id;
    const retrieveResponse = await request(app)
      .get(`/api/events/event/${eventId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    console.log("Event Retrieval Response:", retrieveResponse.body);
    expect(retrieveResponse.status).toBe(200);
    expect(retrieveResponse.body).toHaveProperty(
      "title",
      "Test Event for System"
    );
  });
});
