import { useEffect, useRef, useState } from "react";

// importing icons from Material UI
import {
  Menu as MenuIcon,
  NotificationsNone as NotificationsNoneIcon,
  Search as SearchIcon,
  Mic as MicIcon,
  VideoCallOutlined as VideoCallIcon,
} from "@mui/icons-material";

import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import VideoUpload from "./VideoUpload";
import pp from "../assets/channels4_profile.jpg"; // default profile image

const Navbar = ({ toggleSidebar }) => {
  const [uploadOpen, setUploadOpen] = useState(false); // for upload popup
  const [searchVal, setSearchVal] = useState(""); // for search bar input value
  const [showDrop, setShowDrop] = useState(false); // for show or hide user dropdown menu

  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user); // getting current logged-in user from redux

  // this runs when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token); // decoded token
        console.log("Decoded token:", decoded);
      } catch (err) {
        console.warn("Could not decode token. Might be expired.", err.message);
      }
    }
  }, []);

  // handles clicking outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDrop(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // logout function
  const signOutUser = () => {
    dispatch(logout());
    setShowDrop(false);
    navigate("/");
  };

  return (
    <>
      {/* top navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-white to-gray-100 shadow-md border-b border-gray-300 px-6 sm:px-8 py-2 flex items-center justify-between h-16 font-['Inter']">
        {/* menu icon + logo */}
        <div className="flex items-center gap-4">
          <button onClick={toggleSidebar} className="text-gray-600 hover:text-red-600 hover:scale-110 transition-all duration-300 ease-in-out">
            <MenuIcon className="text-2xl cursor-pointer" />
          </button>
          <Link
            to="/"
            className="text-2xl font-extrabold text-red-600 tracking-wide hover:text-red-700 transition-all duration-300 ease-in-out"
          >
            MyTube
          </Link>
        </div>

        {/* search bar */}
        <div className="hidden sm:flex items-center w-[35%]">
          <div className="flex w-full border border-gray-300 rounded-full overflow-hidden bg-white shadow-sm">
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search videos..."
              className="flex-1 px-4 py-2 text-sm text-gray-600 placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300"
            />
            <button
              className="px-4 py-2 bg-gray-200 border-l border-gray-300 text-gray-600 hover:bg-gray-300 transition-all duration-300"
              onClick={() => navigate(`/search?q=${searchVal}`)}
            >
              <SearchIcon />
            </button>
          </div>
          <div className="ml-3 p-2 bg-white rounded-full shadow-sm cursor-pointer hover:bg-red-600/10 hover:ring-1 hover:ring-red-600/30 transition-all duration-300">
            <MicIcon className="text-gray-600 hover:text-red-600" />
          </div>
        </div>

        {/* upload, notification, and user profile or sign in */}
        <div className="flex items-center gap-5">
          <Link to="/upload" className="p-2 rounded-full shadow-sm hover:bg-red-600/10 hover:ring-1 hover:ring-red-600/30 transition-all duration-300">
            <VideoCallIcon className="text-2xl text-gray-600 hover:text-red-600 hover:scale-110" />
          </Link>

          <div className="p-2 rounded-full shadow-sm hover:bg-red-600/10 hover:ring-1 hover:ring-red-600/30 transition-all duration-300">
            <NotificationsNoneIcon className="text-2xl text-gray-600 hover:text-red-600 hover:scale-110" />
          </div>

          {/* if user is logged in, show profile image and dropdown */}
          {currentUser ? (
            <div className="relative">
              <img
                src={currentUser.img || pp} // use user image or default pic
                alt="user avatar"
                onClick={() => setShowDrop(!showDrop)} // toggle dropdown
                className="w-10 h-10 rounded-full object-cover border border-gray-300 shadow-sm cursor-pointer hover:ring-2 hover:ring-red-600 transition-all duration-300"
              />

              {/* dropdown menu */}
              {showDrop && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-xl z-50 animate-fade-in"
                >
                  {/* Profile Button */}
                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-red-600/10 hover:text-red-600 text-left rounded-t-lg transition-all duration-300"
                  >
                    View Profile
                  </button>

                  <div className="border-t border-gray-300" />

                  {/* Sign Out Button */}
                  <button
                    onClick={signOutUser}
                    className="w-full px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 text-left rounded-b-lg transition-all duration-300"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            // if not logged in, show sign in button
            <Link to="/signin">
              <button className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-full shadow-md ring-2 ring-red-600/50 hover:bg-red-700 hover:scale-105 hover:ring-red-700/50 transition-all duration-300">
                Sign In Now
              </button>
            </Link>
          )}
        </div>
      </nav>

      {uploadOpen && <VideoUpload setOpen={setUploadOpen} />}
    </>
  );
};

export default Navbar;