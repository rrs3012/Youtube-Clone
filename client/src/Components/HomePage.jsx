import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Card from "./Card";
import FilterButtons from "./FilterButtons";
import { Link } from "react-router-dom";

const HomePage = ({ type }) => {
  // all videos from API
  const [videos, setVideos] = useState([]);
  // filtered videos
  const [filteredVideos, setFilteredVideos] = useState([]);
  // default selected category is All
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { currentUser } = useSelector((state) => state.user);

  // runs when type or currentUser changes
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // only fetch if user is logged in
        if (currentUser) {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/videos/${type}`
          );
          setVideos(res.data || []);
          setFilteredVideos(res.data || []);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [type, currentUser]); // re-run if type or user changes

  // this useEffect runs whenever selectedCategory or videos change
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredVideos(videos);
    } else {
      // filter videos by matching tag
      const normalized = selectedCategory.toLowerCase();
      setFilteredVideos(
        videos.filter((video) =>
          video.tags?.some((tag) => tag.toLowerCase() === normalized)
        )
      );
    }
  }, [selectedCategory, videos]);

  return (
    <main className="pt-20 pl-0 lg:pl-64 min-h-screen px-2 sm:px-4 md:px-6 xl:px-10 bg-gray-50">
      {/* category filter buttons */}
      <FilterButtons
        selectedCategory={selectedCategory}
        setCategory={setSelectedCategory}
      />

      <div className="mt-8">
        {/* show login message */}
        {!currentUser ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <p className="text-xl font-semibold text-black mb-4">
              Login to view content
            </p>
            <Link to="/signin">
              <button className="px-6 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition">
                Sign In
              </button>
            </Link>
          </div>
        ) : (
          //show videos message
          <div className="w-full grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 mt-6">
            {filteredVideos.length > 0 ? (
              // show all filtered videos
              filteredVideos.map((video) => (
                <Card key={video._id} video={video} />
              ))
            ) : (
              // if no videos foumd for selected category
              <div className="col-span-full text-center mt-24">
                <p className="text-xl font-semibold text-black mb-4">
                  No videos found in "{selectedCategory}"
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default HomePage;
