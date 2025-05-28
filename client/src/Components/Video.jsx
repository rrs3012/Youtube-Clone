import { useEffect, useState } from "react";
// importing icons from material UI
import {
  ThumbUp,
  ThumbUpOffAlt,
  ThumbDown,
  ThumbDownOffAlt,
  Reply,
  SaveAlt,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { subscription } from "../redux/userSlice";
import { format } from "timeago.js";
import Comments from "./Comments";
import Recommendation from "./Recommendation";
import pp from "../assets/channels4_profile.jpg";

const Video = () => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);

  // Getting video ID from the URL
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  // state for storing the channel/user who uploaded the video
  const [channel, setChannel] = useState({});

  const API_URL = import.meta.env.VITE_API_URL;

  //runs when component mounts or path changes
  useEffect(() => {
    async function getVideoAndChannel() {
      try {
        // First fetch the video data
        const videoResponse = await axios.get(`${API_URL}/videos/find/${path}`);
        // Then fetch the channel info based on veideo userId
        const channelResponse = await axios.get(
          `${API_URL}/users/find/${videoResponse.data.userId}`
        );

        setChannel(channelResponse.data);
        dispatch(fetchSuccess(videoResponse.data));
      } catch (error) {
        console.log("error while getting video/channel data", error);
      }
    }

    getVideoAndChannel();
  }, [path, dispatch, API_URL]);

  // When user clicks like
  const handleLike = async () => {
    if (!currentUser) return;
    try {
      await axios.put(`${API_URL}/users/like/${currentVideo._id}`);
      dispatch(like(currentUser._id));
    } catch (err) {
      console.log("like error", err);
    }
  };

  // When user clicks dislike
  const handleDislike = async () => {
    if (!currentUser) return;
    try {
      await axios.put(`${API_URL}/users/dislike/${currentVideo._id}`);
      dispatch(dislike(currentUser._id));
    } catch (err) {
      console.log("dislike error", err);
    }
  };

  // When user clicks subscribe nd unsubscribe
  const handleSubscription = async () => {
    try {
      const subscribed = currentUser.subscribedUsers.includes(channel._id);
      const subURL = subscribed
        ? `${API_URL}/users/unsub/${channel._id}`
        : `${API_URL}/users/sub/${channel._id}`;
      await axios.put(subURL);
      dispatch(subscription(channel._id));
    } catch (err) {
      console.log("subscription error", err);
    }
  };

  // If video data is not ready yet show loading message
  if (!currentVideo) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-800">
        Loading video...
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-6 mt-16 bg-white text-black">
      <div className="w-full lg:w-2/3">
        {/* Video player section */}
        <div className="relative w-full h-[250px] md:h-[450px] lg:h-[500px] bg-black rounded-xl overflow-hidden shadow-xl">
          {/* Check if it's a YouTube video link */}
          {currentVideo.videoUrl.includes("youtube.com") ||
          currentVideo.videoUrl.includes("youtu.be") ? (
            <iframe
              className="w-full h-full border-0"
              src={currentVideo.videoUrl.replace("watch?v=", "embed/")}
              title="YouTube Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              className="w-full h-full object-cover"
              src={`http://localhost:7272${currentVideo.videoUrl}`}
              controls
            />
          )}
        </div>

        {/* Video title */}
        <h2 className="text-xl font-semibold mt-4">{currentVideo.title}</h2>

        {/* Views and action buttons like, dislike, share, save */}
        <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
          <span>
            {currentVideo.views || 10000} views •{" "}
            {format(currentVideo.createdAt)}
          </span>
          <div className="flex gap-4">
            {/* Like button */}
            <button
              onClick={handleLike}
              className="hover:text-blue-600 transition-all flex items-center gap-1"
            >
              {currentVideo.likes?.includes(currentUser?._id) ? (
                <ThumbUp />
              ) : (
                <ThumbUpOffAlt />
              )}
              {currentVideo.likes?.length}
            </button>
            {/* Dislike button */}
            <button
              onClick={handleDislike}
              className="hover:text-red-600 transition-all flex items-center gap-1"
            >
              {currentVideo.dislikes?.includes(currentUser?._id) ? (
                <ThumbDown />
              ) : (
                <ThumbDownOffAlt />
              )}
              Dislike
            </button>
            {/* Share and Save */}
            <button className="hover:text-sky-600 transition-all flex items-center gap-1">
              <Reply /> Share
            </button>
            <button className="hover:text-yellow-500 transition-all flex items-center gap-1">
              <SaveAlt /> Save
            </button>
          </div>
        </div>

        <hr className="my-4 border-gray-300" />

        {/* Channel info */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            {/* Channel profile picture */}
            <img
              className="w-12 h-12 rounded-full"
              src={pp}
              alt={channel.name}
            />
            <div>
              {/* Channel name and subscribers */}
              <h3 className="font-semibold text-base">{channel.name}</h3>
              <p className="text-sm text-gray-500">
                {channel.subscribers} 10k subscribers
              </p>
              <p className="mt-1 text-sm text-gray-700">{currentVideo.desc}</p>
            </div>
          </div>

          {/* Subscribe button */}
          <button
            onClick={handleSubscription}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
              currentUser.subscribedUsers?.includes(channel._id)
                ? "bg-gray-500 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {currentUser.subscribedUsers?.includes(channel._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </button>
        </div>

        <hr className="my-4 border-gray-300" />

        {/* Comments section */}
        <Comments videoId={currentVideo._id} />
      </div>

      {/* Recommended videos */}
      <div className="w-full lg:w-1/3">
        <Recommendation tags={currentVideo.tags} />
      </div>
    </div>
  );
};

export default Video;
