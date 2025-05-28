import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { createNewChannel, getChannel } from "../controllers/channel.js";

const router = express.Router();

// CHANNEL ROUTES
router.post("/", verifyToken, createNewChannel);   // Create new channel

router.get("/:userId", getChannel);   // Get channel by user ID

export default router;