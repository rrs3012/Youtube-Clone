import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js"; // to format dates for example "5 minutes ago"
import pp from "../assets/channels4_profile.jpg";

const Card = ({ type = "default", video }) => {
  // state to store the channel data
  const [channel, setChannel] = useState(null);

  // useEffect runs when video.userId changes
  useEffect(() => {
    const fetchChannel = async () => {
      // only fetch if userId exists in video object
      if (video?.userId) {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/users/find/${video.userId}`
          );
          setChannel(res.data);
        } catch (err) {
          console.error("Error fetching channel info:", err);
        }
      }
    };

    fetchChannel();
  }, [video?.userId]);

  // show loading message if data is not ready
  if (!video) return <p className="text-gray-600 font-['Inter']">Fetching video details...</p>;

  // if imgurl starts with http use it directly use placeholder
  const thumbnail = video.imgUrl?.startsWith("http")
    ? video.imgUrl
    : `http://localhost:7272${video.imgUrl || "/placeholder.jpg"}`;

  return (
    // Link wraps whole card and make it clickable
    <Link to={`/video/${video._id}`} className="w-full">
      <div
        className={`group transition-all duration-300 cursor-pointer bg-gray-100 rounded-lg ${
          type === "sm"
            ? "flex gap-2 w-full"
            : "hover:shadow-lg hover:scale-[1.03]"
        }`}
      >
        <div
          className={`relative ${
            type === "sm"
              ? "w-[168px] h-[94px] flex-shrink-0"
              : "w-full pb-[56.25%]"
          } bg-gray-200 rounded-lg overflow-hidden shadow-sm hover:ring-2 hover:ring-red-600 transition duration-300`}
        >
          {/* thumbnail image */}
          <img
            src={thumbnail}
            alt={video.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>

        <div
          className={`flex ${
            type === "sm" ? "flex-col justify-between" : "mt-4 gap-4"
          }`}
        >
          {type !== "sm" && (
            <img
              src={channel?.img || pp}
              alt={channel?.name}
              className="w-9 h-9 rounded-full bg-gray-200 border border-gray-300"
            />
          )}
          <div className="flex flex-col">
            {/* video title */}
            <h3 className="text-sm font-semibold text-gray-600 line-clamp-2 hover:text-red-600 transition duration-300">
              {video.title || "No Title Available"}
            </h3>
            {/* channel name */}
            <p className="text-xs text-gray-600 mt-1 font-['Inter']">
              {channel?.name || "Anonymous Creator"}
            </p>
            {/* views and time ago */}
            <p className="text-xs text-gray-400 mt-1 font-['Inter']">
              {video.views || 0} views • {format(video.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;