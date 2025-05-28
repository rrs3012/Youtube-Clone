import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";
import dp from "../assets/11539820.png";

const Comments = ({ videoId }) => {
  // current loggedIn user from redux store
  const { currentUser } = useSelector((state) => state.user);

  // state to show all comments of the video
  const [comments, setComments] = useState([]);

  // state for writing a new comment
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // this runs when videoId changes
    const getComments = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/comments/${videoId}`
        );
        setComments(res.data || []);
        console.log("Fetched comments:", res.data);
      } catch (err) {
        console.log("couldn't load comments", err);
      }
    };

    getComments();
  }, [videoId]);

  // function to post new comment
  const handleAddComment = async () => {
    if (!newComment.trim()) {
      console.log("Empty comment, not adding");
      return;
    }

    try {
      const token = currentUser.token; // token from user
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/comments/`,
        {
          videoId,
          desc: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComments((prev) => [res.data, ...prev]); // show new comment on top
      setNewComment("");
      console.log("Comment added");
    } catch (err) {
      console.log("error posting comment", err);
    }
  };

  // delete comment
  const handleDeleteComment = (id) => {
    const updated = comments.filter((comment) => comment._id !== id);
    setComments(updated);
  };

  return (
    <div className="w-full p-4 bg-gray-100 rounded-lg font-['Inter']">
      {/* comment input box */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={currentUser?.img || dp}
          alt="Avatar"
          className="w-10 h-10 rounded-full object-cover bg-gray-200 border border-gray-300 shadow-sm"
        />
        <input
          type="text"
          placeholder="Share your thoughts..."
          className="w-full border border-gray-300 bg-white text-gray-600 rounded-lg p-3 outline-none focus:ring-2 focus:ring-red-600 hover:shadow-sm transition duration-300 placeholder-gray-400"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          onClick={handleAddComment}
          className="bg-red-600 text-white px-4 py-1.5 rounded-full shadow-md hover:bg-red-700 hover:shadow-lg transition duration-300"
        >
          Post
        </button>
      </div>

      {/* show list of comments */}
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            onDelete={handleDeleteComment}
          />
        ))
      ) : (
        <p className="text-gray-400 text-sm italic">Be the first to comment!</p>
      )}
    </div>
  );
};

export default Comments;