import Video from "../models/Video.js";
import { createError } from "../error.js";
import User from "../models/User.js";

// ADD VIDEO CONTROLLER
export const addVideo = async (req, res) => {
    try {
      if (!req.files || !req.files.videoFile || !req.files.imgFile) {
        return res.status(400).json({ error: "Please upload both video and image files." });
      }
  
      const newVideo = new Video({
        userId: req.user.id,
        title: req.body.title,
        desc: req.body.desc,
        tags: req.body.tags.split(","),
        videoUrl: `/uploads/${req.files.videoFile[0].filename}`,
        imgUrl: `/uploads/${req.files.imgFile[0].filename}`,
      });
  
      await newVideo.save();  // Save to DB
      res.status(201).json({ message: "Video uploaded successfully", video: newVideo });
    } catch (error) {
      console.error("Error uploading video:", error);
      res.status(500).json({ error: "Something went wrong. Please try again later." });
    }
  };


// ADD VIDEO VIA URL
export const addVideos = async (req, res) => {
try {
    const { title, desc, tags, videoUrl, imgUrl } = req.body;
  
    //all required fields are required
    if (!title || !desc || !videoUrl || !imgUrl) {
    return res.status(400).json({ error: "All fields are required." });
    }
  
    const newVideo = new Video({
    userId: req.user.id,
    title,
    desc,
    tags: Array.isArray(tags) ? tags : tags.split(","),
    videoUrl,
    imgUrl,
    });
  
    await newVideo.save();
    res.status(201).json({ message: "Video uploaded successfully", video: newVideo });
} catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).json({ error: "Something went wrong. Please try again later." });
  }
};


// UPDATE VIDEO CONTROLLER
export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found."));
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedVideo);
    } else {
      return next(createError(403, "You can only update your own videos."));
    }
  } catch (err) {
    next(err);
  }
};


// DELETE VIDEO CONTROLLER
export const removeVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found."));
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("Video deleted successfully.");
    } else {
      return next(createError(403, "You can only delete your own videos."));
    }
  } catch (err) {
    next(err);
  }
};


// GET VIDEO CONTROLLER
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found."));
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};


// GET VIDEO OF USER CONTROLLER
export const getUserVideos = async (req, res, next) => {
  try {
    const videos = await Video.find({ userId: req.params.userId });
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};


// SUBSCRIBE CONTROLLER
export const subsVideo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );
    res.status(200).json(list.flat());
  } catch (err) {
    next(err);
  }
};


//GET VIDEO USING TAG CONTROLLER
export const getVideoByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};


// SEARCH VIDEO CONTROLLLER
export const searchVideo = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({ title: { $regex: query, $options: "i" } }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};


// SHOW RANDOM VIDEOS CONTROLLER
export const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};