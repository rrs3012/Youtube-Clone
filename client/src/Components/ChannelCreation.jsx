import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Ensure Inter font is included in index.html: 
// <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

const ChannelCreation = () => {
  const [channelName, setChannelName] = useState("");
  const [channelDescription, setChannelDescription] = useState("");
  const [isChannelCreated, setIsChannelCreated] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChannelCreation = async () => {
    if (!channelName || !channelDescription) {
      toast.error("Both fields are required");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/channels`,
        {
          name: channelName,
          description: channelDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Channel create response:", res.data);
      toast.success("Channel is created!");
      setIsChannelCreated(true);

      setTimeout(() => {
        navigate("/profile");
      }, 1300);
    } catch (err) {
      console.error("Error while creating:", err);
      toast.error("Something went wrong or already created");
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-lg mx-auto p-10 bg-gray-200 rounded-xl shadow-lg border border-gray-300 text-white">
          <h2 className="text-3xl font-bold mb-4 text-red-600 font-['Inter']">
            Sign In Required
          </h2>
          <p className="text-gray-600 font-['Inter']">
            Please sign in to start building your MyTube channel.
          </p>
        </div>
      </div>
    );
  }

  if (isChannelCreated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600 text-3xl font-semibold font-['Inter'] animate-pulse">
          Your channel is live!
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 font-['Inter']">
      <div className="w-full max-w-md p-10 bg-gray-200 rounded-xl shadow-xl border border-gray-300">
        <h2 className="text-3xl font-semibold mb-8 text-gray-600">
          Create Your Channel Identity
        </h2>

        {/* Channel Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Channel Name
          </label>
          <input
            type="text"
            placeholder="e.g. Radhey’s Vlogs"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            className="w-full px-4 py-3 bg-gray-100 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 hover:shadow-lg transition duration-300 placeholder-gray-400"
          />
        </div>

        {/* Channel Description */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Channel Description
          </label>
          <input
            type="text"
            placeholder="e.g. Sharing my journey with tech and creativity!"
            value={channelDescription}
            onChange={(e) => setChannelDescription(e.target.value)}
            className="w-full px-4 py-3 bg-gray-100 text-gray-600 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 hover:shadow-lg transition duration-300 placeholder-gray-400"
          />
        </div>

        {/* Terms and conditions */}
        <p className="text-xs text-gray-400 mb-8">
          By creating your channel, you agree to{" "}
          <span className="text-red-600 cursor-pointer hover:underline">
            MyTube’s Terms of Service
          </span>
          . Changes to your name or profile image will only apply to MyTube.
        </p>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-red-600 hover:text-red-500 font-medium transition duration-300"
          >
            Back
          </button>
          <button
            onClick={handleChannelCreation}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 font-medium transition duration-300 shadow-md"
          >
            Launch Channel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChannelCreation;