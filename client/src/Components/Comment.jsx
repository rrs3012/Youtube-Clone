import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";

const Comment = ({ comment, onDelete }) => {
  // state to hold the user who posted the comment
  const [channel, setChannel] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    // fetch the user info of commented user
    const getCommentUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/find/${comment.userId}`
        );
        setChannel(res.data);
        console.log("Comment owner:", res.data);
      } catch (err) {
        console.log("Could not fetch user data:", err);
      }
    };

    getCommentUser();
  }, [comment.userId]);

  // function to delete comment
  const handleDelete = async () => {
    if (!currentUser) return;

    try {
      const token = currentUser.token; // token from user
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/comments/${comment._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Comment deleted:", res.data);
      onDelete(comment._id); // delete comment
    } catch (err) {
      console.log("Something went wrong while deleting comment:", err);
    }
  };

  return (
    <div className="flex items-start gap-4 my-4 p-4 bg-gray-100 rounded-lg w-full font-['Inter']">
      {/* user profile */}
      <img
        className="w-10 h-10 rounded-full bg-gray-200 border border-gray-300 shadow-sm"
        src={channel.img}
        alt={channel.name || "Anonymous Creator"}
      />

      {/* comment details */}
      <div className="flex flex-col gap-1 text-gray-600">
        <span className="text-sm font-semibold">
          {channel.name || "Anonymous Creator"}
          <span className="text-xs font-normal text-gray-400 ml-2">
            {format(comment.createdAt)}
          </span>
        </span>

        {/* comment text */}
        <span className="text-sm">{comment.desc}</span>
      </div>

      {/* show delete button if user is real */}
      {(currentUser?._id === comment.userId ||
        currentUser?._id === channel._id) && (
        <button
          onClick={handleDelete}
          className="text-red-600 text-xs px-3 py-1 border border-red-600 rounded-full hover:bg-red-600 hover:text-white hover:shadow-sm transition duration-300"
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default Comment;