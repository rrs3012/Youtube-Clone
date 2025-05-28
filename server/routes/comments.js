import express from "express";
import {addNewComment, removeComment, getAllComments} from "../controllers/comment.js";
import { verifyToken } from "../middlewares/verifyToken.js";


const router = express.Router();

// COMMENT ROUTES
router.post("/", verifyToken, addNewComment);  // Add new comment
router.delete("/:id", verifyToken, removeComment);   // Delete comment
router.get("/:videoId", getAllComments);  // Get all comments

export default router;