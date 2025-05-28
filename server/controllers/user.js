import User from "../models/User.js";
import Video from "../models/Video.js";

// GET USER DETAILS CONTROLLER
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);  // find user in DB by id
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};


// SUBSCRIBE USER CONTROLLER
export const subscribeUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscription successful!");
  } catch (err) {
    next(err);
  }
};


// UNSUBSCRIBE USER CONTROLLER
export const unsubscribeUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },  // $pull removes from array
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },     // Decrement subscribers count
    });
    res.status(200).json("Unsubscription successful.");
  } catch (err) {
    next(err);
  }
};

// LIKE VIDEO CONTROLLER
export const likeVideo = async (req, res, next) => {
  const userId = req.user.id;    // Logged-in user ID
  const videoId = req.params.videoId;
  try {
    const updatedVideo = await Video.findByIdAndUpdate(
      videoId,
      {
        $addToSet: { likes: userId },     // Add to likes
        $pull: { dislikes: userId },      // Remove from dislikes
      },
      { new: true }
    );
    res.status(200).json(updatedVideo);
  } catch (err) {
    next(err);
  }
};

// DISLIKE VIDEO CONTROLLER
export const dislikeVideo = async (req, res, next) => {
  const userId = req.user.id;     // Logged-in user ID
  const videoId = req.params.videoId;
  try {
    const updatedVideo = await Video.findByIdAndUpdate(
      videoId,
      {
        $addToSet: { dislikes: userId },   // Add to dislikes
        $pull: { likes: userId },     // Remove from likes
      },
      { new: true }
    );
    res.status(200).json(updatedVideo);
  } catch (err) {
    next(err);
  }
};