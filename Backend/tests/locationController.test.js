const request = require("supertest");
const pool = require("../config/db");
const app = require("../app");
require("dotenv").config(); 
describe("Location Controller", () => {
  it("should retrieve all locations", async () => {
    const response = await request(app).get("/api/locations");
    console.log("Location response:", response.body); 
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
  afterAll(async () => {
    if (pool) await pool.end();
  });

});
