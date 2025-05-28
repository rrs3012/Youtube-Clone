import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

const VideoUpload = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!currentUser) {
      alert("Please login first");
      return;
    }

    if (!title || !desc || !imgFile || !videoFile) {
      alert("All fields and files are required");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("tags", tags);
    formData.append("imgFile", imgFile);
    formData.append("videoFile", videoFile);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/videos`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Upload response:", res.data);
      toast.success("Video uploaded!");
      setTitle("");
      setDesc("");
      setTags("");
      setImgFile(null);
      setVideoFile(null);
    } catch (err) {
      console.log("Upload error:", err);
      alert("Upload failed.");
    }

    setLoading(false);
  };

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-lg mt-20 mx-auto p-8 bg-white rounded-lg text-black border border-gray-300 shadow">
          <h2 className="text-3xl font-bold mb-4 text-red-600">Login Needed</h2>
          <p>Please login to upload videos.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 max-w-6xl mx-auto px-4 md:px-8 pb-16">
      <div className="flex flex-col lg:flex-row gap-8 bg-white text-black">
        {/* File Uploads */}
        <div className="w-full lg:w-1/3 bg-white border border-gray-300 rounded-lg p-6 space-y-6 shadow">
          <h3 className="text-lg font-semibold mb-4">Upload Files</h3>

          {/* Thumbnail Upload */}
          <label className="block bg-gray-100 border border-gray-300 rounded p-5 text-center cursor-pointer hover:bg-gray-200 transition">
            <CloudUploadOutlinedIcon className="text-4xl text-gray-500 mb-2" />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImgFile(e.target.files[0])}
              className="hidden"
            />
            <p className="text-sm">
              {imgFile ? imgFile.name : "Upload Thumbnail"}
            </p>
          </label>

          {/* Video Upload */}
          <label className="block bg-gray-100 border border-gray-300 rounded p-5 text-center cursor-pointer hover:bg-gray-200 transition">
            <CloudUploadOutlinedIcon className="text-4xl text-gray-500 mb-2" />
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
              className="hidden"
            />
            <p className="text-sm">
              {videoFile ? videoFile.name : "Upload Video File"}
            </p>
          </label>
        </div>

        {/* Video Details */}
        <div className="w-full lg:w-2/3 bg-white border border-gray-300 rounded-lg p-6 space-y-6 shadow">
          <h2 className="text-2xl font-semibold mb-4">Video Details</h2>

          <div>
            <label className="text-sm text-gray-700 block mb-2">Title *</label>
            <input
              type="text"
              placeholder="Give your video a title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-white text-black border border-gray-300 rounded"
            />
            <p className="text-right text-xs text-gray-500 mt-1">
              {title.length}/100
            </p>
          </div>

          <div>
            <label className="text-sm text-gray-700 block mb-2">Description</label>
            <textarea
              placeholder="Tell viewers about your video"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={5}
              className="w-full p-3 bg-white text-black border border-gray-300 rounded resize-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 block mb-2">Tags</label>
            <input
              type="text"
              placeholder="e.g., react, songs, css"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-3 bg-white text-black border border-gray-300 rounded"
            />
          </div>

          <div className="pt-4">
            <button
              onClick={handleUpload}
              disabled={loading}
              className={`w-full py-3 font-semibold rounded transition ${
                loading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {loading ? "Uploading..." : "Upload Video"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
