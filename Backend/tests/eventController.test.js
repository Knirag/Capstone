const request = require("supertest");
const pool = require("../config/db");
const app = require("../app");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwtHelper");
const { sendNotification } = require("../utils/notifications");
const { v4: uuidv4 } = require("uuid"); // Import UUID package

jest.mock("../utils/notifications", () => ({
  sendNotification: jest.fn(), // Ensure it's mocked
}));

describe("Event Controller - Cell Leader", () => {
  let testCellId, testVillageId, cellLeaderToken, cellLeaderId;

  beforeAll(async () => {
    // Create locations with UUIDs
    testCellId = uuidv4();
    await pool.query(
      `INSERT INTO locations (id, name, level) VALUES (?, 'Test Cell', 'cell')`,
      [testCellId]
    );

    testVillageId = uuidv4();
    await pool.query(
      `INSERT INTO locations (id, name, level, parent_id) 
       VALUES (?, 'Test Village', 'village', ?)`,
      [testVillageId, testCellId]
    );

    // Create users with UUIDs
    const user1Id = uuidv4();
    const user2Id = uuidv4();
    const hashedPassword = await bcrypt.hash("password123", 10);

    await pool.query(
      `INSERT INTO users (id, phone_number, username, push_token, location_id, password) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        user1Id,
        "1234567890",
        "User One",
        "test-token-1",
        testCellId,
        hashedPassword,
      ]
    );
    await pool.query(
      `INSERT INTO users (id, phone_number, username, push_token, location_id, password) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        user2Id,
        "0987654321",
        "User Two",
        "test-token-2",
        testVillageId,
        hashedPassword,
      ]
    );

    // Insert cell leader with UUID
    cellLeaderId = uuidv4();
    const leaderPassword = await bcrypt.hash("password123", 10);
    await pool.query(
      `INSERT INTO admins (id, username, email, password, role, location_id) 
       VALUES (?, 'cellLeaderUser', 'cellleader@example.com', ?, 'cellLeader', ?)`,
      [cellLeaderId, leaderPassword, testCellId]
    );

    // Generate token for cell leader
    cellLeaderToken = generateToken({
      id: cellLeaderId,
      role: "cellLeader",
      location_id: testCellId,
    });

    // Create an event for the cell location with UUID
    const eventId = uuidv4();
    await pool.query(
      `INSERT INTO events (id, title, description, event_date, location_id, created_by, event_place) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        eventId,
        "Cell Leader Event",
        "A test event for the cell",
        "2024-12-01 10:00:00",
        testCellId,
        cellLeaderId,
        "Test Event Place",
      ]
    );

    // Debug: Check inserted events
    const [rows] = await pool.query(
      `SELECT * FROM events WHERE location_id = ?`,
      [testCellId]
    );
    console.log("All Events Inserted for Test Cell:", rows);
  });

  afterAll(async () => {
    // Clean up
    await pool.query(`DELETE FROM events WHERE location_id = ?`, [testCellId]);
    await pool.query(`DELETE FROM locations WHERE id IN (?, ?)`, [
      testCellId,
      testVillageId,
    ]);
    await pool.query(`DELETE FROM users WHERE location_id IN (?, ?)`, [
      testCellId,
      testVillageId,
    ]);
    await pool.query(`DELETE FROM admins WHERE id = ?`, [cellLeaderId]);
    if (pool) await pool.end();
  });

  test("should create a new event for the cell and notify users in cell and villages", async () => {
    const createEventData = {
      title: "New Event",
      description: "A test event",
      event_date: "2024-12-01 10:00:00",
      location_id: testCellId,
      event_place: "Test Location",
      created_by: cellLeaderId,
    };

    const createEventResponse = await request(app)
      .post("/api/events")
      .set("Authorization", `Bearer ${cellLeaderToken}`)
      .send(createEventData);

    console.log("Create Event Response:", createEventResponse.body);

    expect(createEventResponse.status).toBe(201);
    expect(createEventResponse.body).toHaveProperty("event");
    expect(createEventResponse.body.event).toHaveProperty("id");
  });

  test("should retrieve events by location for the cell and villages", async () => {
    const response = await request(app)
      .get("/api/events")
      .query({ location_id: testCellId })
      .set("Authorization", `Bearer ${cellLeaderToken}`);

    console.log("Event Retrieval Response:", response.body);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0); // Ensure events are returned
    expect(response.body[0]).toHaveProperty("title", "Cell Leader Event");
  });

  test("should update an event and not change its location", async () => {
    const createEventData = {
      title: "Update Event",
      description: "Updated test event",
      event_date: "2024-12-01 10:00:00",
      location_id: testCellId,
      event_place: "Updated Test Location",
      created_by: cellLeaderId,
    };

    const createEventResponse = await request(app)
      .post("/api/events")
      .set("Authorization", `Bearer ${cellLeaderToken}`)
      .send(createEventData);

    const eventId = createEventResponse.body.event.id;

    const updateEventData = {
      title: "Updated Title",
      description: "Updated Description",
      event_date: "2024-12-02 10:00:00",
      event_place: "Updated Event Location",
    };

    const updateEventResponse = await request(app)
      .put(`/api/events/${eventId}`)
      .set("Authorization", `Bearer ${cellLeaderToken}`)
      .send(updateEventData);

    console.log("Update Event Response:", updateEventResponse.body);

    expect(updateEventResponse.status).toBe(200);
    expect(updateEventResponse.body).toHaveProperty("event");
    expect(updateEventResponse.body.event.title).toBe("Updated Title");
  });
});
