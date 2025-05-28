import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "./Card";

const Search = () => {
  const [videos, setVideos] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const query = useLocation().search;

  useEffect(() => {
    if (!currentUser) return;

    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/videos/search${query}`
        );

        if (response?.data) {
          setVideos(response.data);
        } else {
          setVideos([]);
        }
      } catch (err) {
        console.log("Something went wrong while searching:", err);
      }
    };

    fetchSearchResults();
  }, [query, currentUser]);

  return (
    <div className="min-h-screen pt-20 px-4 bg-gray-50 dark:bg-gray-900">
      {videos.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {videos.map((video) => (
            <Card key={video._id} video={video} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            No results found for your search.
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;
