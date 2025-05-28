import express from "express";
import { dislikeVideo, getUser, likeVideo, subscribeUser, unsubscribeUser } from "../controllers/user.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

//  USER ROUTES
router.get("/find/:id", getUser );  // Get a user by ID

router.put("/sub/:id",verifyToken, subscribeUser );  // Subscribe to user

router.put("/unsub/:id", verifyToken, unsubscribeUser );  // Unsubscribe from user

router.put("/like/:videoId",verifyToken, likeVideo );   // Like a video

router.put("/dislike/:videoId",verifyToken, dislikeVideo );  // Dislike a video

export default router;