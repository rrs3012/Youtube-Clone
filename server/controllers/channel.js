import Channel from "../models/Channel.js";
import { createError } from "../error.js";


// CREATE NEW CHANNEL CONTROLLER
export const createNewChannel = async (req, res, next) => {
    try {
      const existingChannel = await Channel.findOne({ userId: req.user.id });
      if (existingChannel) {
        return next(createError(400, "You already have a channel!"));
      }
      
      // new channel obj with data from request
      const newChannelData = new Channel({
        userId: req.user.id,
        name: req.body.name,
        description: req.body.description,
      });
  
      const savedChannelData = await newChannelData.save();    // Save the channel in DB
      return res.status(200).json(savedChannelData);
    } catch (err) {
      next(err);
    }
  };



  // GET CHANNEL CONTROLLER
export const getChannel = async (req, res, next) => {
try {
    const channelData = await Channel.findOne({ userId: req.params.userId });
    if (!channelData) return next(createError(404,"Channel not found!"));
    res.status(200).json(channelData);
 } catch (err) {
    next(err);
  }
 };