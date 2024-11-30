const express = require("express");
const { sendOtp, verifyOtp } = require("../controllers/otpController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: OTP
 *   description: Routes related to OTP (One Time Password) operations
 */

/**
 * @swagger
 * /api/otp/request:
 *   post:
 *     summary: Request an OTP
 *     description: Sends an OTP to the user's phone number for authentication or verification.
 *     tags: [OTP]
 *     requestBody:
 *       description: The phone number for which OTP is requested
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone_number:
 *                 type: string
 *                 description: The phone number to send the OTP to
 *                 example: "1234567890"
 *     responses:
 *       200:
 *         description: OTP successfully sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the OTP was successfully sent
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Status message for OTP request
 *                   example: "OTP sent successfully to the phone number."
 *       400:
 *         description: Invalid phone number or bad request
 *       500:
 *         description: Internal server error while sending OTP
 */

/**
 * @swagger
 * /api/otp/verify:
 *   post:
 *     summary: Verify an OTP
 *     description: Verifies the OTP entered by the user to complete the authentication or action.
 *     tags: [OTP]
 *     requestBody:
 *       description: The OTP and phone number for verification
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone_number:
 *                 type: string
 *                 description: The phone number associated with the OTP
 *                 example: "1234567890"
 *               otp:
 *                 type: string
 *                 description: The OTP entered by the user
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP successfully verified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the OTP was successfully verified
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Status message for OTP verification
 *                   example: "OTP verified successfully."
 *       400:
 *         description: Invalid OTP or phone number
 *       401:
 *         description: OTP expired or invalid
 *       500:
 *         description: Internal server error while verifying OTP
 */

router.post("/request", sendOtp);
router.post("/verify", verifyOtp);

module.exports = router;
