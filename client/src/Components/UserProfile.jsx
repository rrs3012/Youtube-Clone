import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Card from "./Card";
import { toast } from "react-toastify";
import { Edit, Delete, Save, Close } from "@mui/icons-material";
import banneryoutube from "../assets/banneryoutube.jpg";
import pp from "../assets/channels4_profile.jpg";

const UserProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [videos, setVideos] = useState([]);
  const [channel, setChannel] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    if (currentUser) {
      getUserVideos();
      getChannelData();
    }
  }, [currentUser]);

  const getUserVideos = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/videos/user/${currentUser._id}`
      );
      setVideos(res.data);
    } catch (error) {
      console.error("Could not fetch user videos", error);
    }
  };

  const getChannelData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/channels/${currentUser._id}`
      );
      setChannel(res.data);
    } catch (error) {
      console.warn("Channel data not found", error);
      setChannel(null);
    }
  };

  const deleteVideo = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/videos/${id}`);
      setVideos((prev) => prev.filter((v) => v._id !== id));
      toast.success("Video removed.");
    } catch (error) {
      console.error("Error deleting the video", error);
    }
  };

  const startEditing = (video) => {
    setEditingVideo(video._id);
    setNewTitle(video.title);
  };

  const updateTitle = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/videos/${id}`, {
        title: newTitle,
      });
      setVideos((prev) =>
        prev.map((v) => (v._id === id ? { ...v, title: newTitle } : v))
      );
      setEditingVideo(null);
    } catch (error) {
      console.error("Unable to update video", error);
    }
  };

  if (!currentUser) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-xl font-semibold text-gray-700">
          Please sign in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full font-sans pt-20 bg-gray-50 min-h-screen">
      {channel && (
        <div>
          <div className="relative h-52 w-full">
            <img
              src={channel.bannerUrl || banneryoutube}
              alt="Banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-[-40px] left-14">
              <img
                src={channel.profileUrl || pp}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
              />
            </div>
          </div>

          <div className="pt-16 pl-14 pr-4">
            <h2 className="text-2xl font-bold">{channel.name}</h2>
            <p className="text-sm text-gray-600 mt-1">
              @{channel.description} • {videos.length} videos
            </p>
            <button className="mt-3 px-6 py-2 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-all shadow">
              Subscribe
            </button>
          </div>
        </div>
      )}

      <div className="border-b border-gray-300 mt-8 px-14">
        <div className="flex gap-8 text-sm font-medium text-gray-600">
          <button className="py-3 border-b-2 border-black text-black">Videos</button>
          <button className="py-3 hover:text-black transition">Shorts</button>
        </div>
      </div>

      <div className="px-14 mt-10">
        <h3 className="text-xl font-semibold mb-6 text-gray-800">Your Uploads</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.length > 0 ? (
            videos.map((video) => (
              <div
                key={video._id}
                className="relative group bg-white rounded-xl shadow hover:shadow-lg transition-all p-2"
              >
                <Card video={video} />

                {editingVideo === video._id ? (
                  <div className="mt-3 flex items-center gap-2">
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => updateTitle(video._id)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Save />
                    </button>
                    <button
                      onClick={() => setEditingVideo(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Close />
                    </button>
                  </div>
                ) : (
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => startEditing(video)}
                      className="bg-white p-1 rounded-full shadow hover:shadow-md"
                    >
                      <Edit fontSize="small" />
                    </button>
                    <button
                      onClick={() => deleteVideo(video._id)}
                      className="bg-white p-1 rounded-full shadow hover:shadow-md"
                    >
                      <Delete fontSize="small" color="error" />
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">You haven't uploaded any videos yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
