import express from "express";
import { addVideo, addVideos, updateVideo, removeVideo, getVideo, getUserVideos, subsVideo, getVideoByTag, searchVideo, random} from "../controllers/video.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { uploadFiles } from "../middlewares/multerConfig.js";

const router = express.Router();

// VIDEO ROUTES
router.post("/",verifyToken, uploadFiles, addVideo);   // Upload video
router.post("/add", verifyToken, addVideos);    // Upload video using URL fields
router.put("/:id", verifyToken, updateVideo);  // Update video
router.delete("/:id", verifyToken, removeVideo);  // Delete video 
router.get("/find/:id", getVideo);  // Get video by ID
router.get("/user/:userId", getUserVideos); // Get all videos uploaded by user
router.get("/sub", verifyToken, subsVideo);   // Get videos from susbcribed channels
router.get("/tags", getVideoByTag);   // Get videos by tag
router.get("/search",  searchVideo);  // Search videos by title
router.get("/random", random);  // Get a random videos


export default router;