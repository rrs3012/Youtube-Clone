import Comment from "../models/Comment.js";
import { createError } from "../error.js";
import Video from "../models/Video.js";

// ADD NEW COMMENT CONTROLLER
export const addNewComment = async (req, res, next) => {
    if (!req.user) return next(createError(401, "You must be logged in to comment."));
    // Create new comment obj with data from frontend
    const newComment = new Comment({ ...req.body, videoId: String(req.body.videoId), userId: req.user.id });
    try {
      const savedComment = await newComment.save();   // // Save the comment in DB
      res.status(200).json(savedComment);
    } catch (err) {
      next(err);
    }
  };


  // REMOVE COMMENT CONTROLLER
  export const removeComment = async (req, res, next) => {
    try {
      // Find comment by id from the url
      const commentToDelete = await Comment.findById(req.params.id);
      if (!commentToDelete) return next(createError(404, "Comment not found."));
      const associatedVideo = await Video.findById(commentToDelete.videoId);
      if (!associatedVideo) {
        await Comment.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Comment successfully deleted." });
      }
      // User authenication to delete comment 
      if (req.user.id === commentToDelete.userId || req.user.id === associatedVideo.userId) {
        await Comment.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Comment deleted successfully." });
      } else {
        return next(createError(403, "You can only delete your own comment."));
      }
    } catch (err) {
      console.error("Error deleting comment:", err);
      next(err);
    }
  };


  // GET ALL COMMENTS FOR A VIDEO
  export const getAllComments = async (req, res, next) => {
    try {
        const videoComments = await Comment.find({ videoId: String(req.params.videoId) });
        res.status(200).json(videoComments);
    } catch (err) {
        next(err);
    }
};
