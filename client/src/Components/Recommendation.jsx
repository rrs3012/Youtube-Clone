import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Components/Card";

const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]); // to store recommended videos
  const [loading, setLoading] = useState(true); // loading state

  // runs when component mounts or tags change
  useEffect(() => {
    // function to fetch recommended videos from server
    const fetchRecommendedVideos = async () => {
      setLoading(true);
      try {
        // convert array of tags to a comma-separated string
        const formattedTags = Array.isArray(tags) ? tags.join(",") : tags;

        // make GET request to API using tags
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/videos/tags?tags=${formattedTags}`
        );

        setVideos(res.data);
      } catch (err) {
        console.error("Error while fetching recommendations:", err);
      }
      setLoading(false);
    };

    // only call API if tags are available
    if (tags && tags.length > 0) {
      fetchRecommendedVideos();
    }
  }, [tags]);

  return (
    <div className="flex flex-col gap-4 mt-4 p-4 bg-gray-100 rounded-lg shadow-md border border-gray-300 max-w-sm font-['Inter']">
      {/* show loading text when data is fetching */}
      {loading && (
        <p className="text-sm text-gray-600 italic bg-white rounded-lg p-3 shadow-sm animate-pulse transition-opacity duration-300 ease-in-out">
          Fetching related videos…
        </p>
      )}

      {/* show if no videos found */}
      {!loading && videos.length === 0 && (
        <p className="text-sm text-gray-600 italic bg-white rounded-lg p-3 shadow-sm transition-opacity duration-300 ease-in-out">
          No related videos yet. Check back soon!
        </p>
      )}

      {/* show all recommended videos using Card component */}
      {!loading &&
        videos.map((video) => (
          <div
            key={video._id}
            className="transition-transform duration-300 ease-in-out transform hover:scale-105"
          >
            <Card video={video} type="sm" />
          </div>
        ))}
    </div>
  );
};

export default Recommendation;