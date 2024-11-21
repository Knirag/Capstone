const express = require("express");
const router = express.Router();
const {
  createSupportTicket,
  updateSupportTicket,
  getSupportTicket,
  getAllSupportTickets,
} = require("../controllers/supportController");
const adminMiddleware = require("../middleware/adminMiddleware");
router.post("/", adminMiddleware, createSupportTicket);
router.put("/:id", adminMiddleware, updateSupportTicket);
router.get("/:id", adminMiddleware, getSupportTicket);
router.get("/", adminMiddleware, getAllSupportTickets);
console.log("createSupportTicket:", createSupportTicket);

module.exports = router;
