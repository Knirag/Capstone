const request = require("supertest");
const app = require("../app");
const locations = require("../config/locations");

describe("Location Controller", () => {
  it("should retrieve all locations", async () => {
    const response = await request(app).get("/api/locations");

    console.log("Location response:", response.body);

    expect(response.status).toBe(200); // Expect success
    expect(Array.isArray(response.body)).toBe(true); // Ensure array
    expect(response.body.length).toBe(locations.length); // Match total count
    expect(response.body[0]).toHaveProperty("id"); // Validate structure
    expect(response.body[0]).toHaveProperty("name");
    expect(response.body[0]).toHaveProperty("level");
    expect(response.body[0]).toHaveProperty("parent_id");
  });

  it("should retrieve a specific location by ID", async () => {
    const testLocationId = "b23ce48c-aaca-11ef-a1dd-5cfb3a69536a"; // Gasabo
    const response = await request(app).get(`/api/locations/${testLocationId}`);

    console.log("Specific location response:", response.body);

    expect(response.status).toBe(200); // Expect success
    expect(response.body).toHaveProperty("id", testLocationId);
    expect(response.body).toHaveProperty("name", "Gasabo");
    expect(response.body).toHaveProperty("level", "district");
    expect(response.body).toHaveProperty("parent_id", null);
  });

  it("should return 404 for a non-existent location ID", async () => {
    const response = await request(app).get("/api/locations/non-existent-id");

    console.log("Non-existent location response:", response.body);

    expect(response.status).toBe(404); // Expect not found
    expect(response.body).toHaveProperty("message", "Location not found.");
  });
});
