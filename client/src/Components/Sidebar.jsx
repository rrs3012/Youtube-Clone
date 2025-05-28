import {
  HomeOutlined,
  SubscriptionsOutlined,
  VideoLibraryOutlined,
  PersonOutline,
  ChevronRight,
  MusicNoteOutlined,
  StorefrontOutlined,
  LiveTvOutlined,
  SportsEsportsOutlined,
  HistoryOutlined,
  PlaylistPlayOutlined,
  WhatshotOutlined,
  MovieOutlined,
  SettingsOutlined,
  FlagOutlined,
  HelpOutline,
  FeedbackOutlined,
  SmartDisplayOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, isLargeScreen }) => {
  const sidebarItems = [
    { id: 1, name: "Home", icon: <HomeOutlined />, path: "/" },
    { id: 2, name: "My Channel", icon: <PersonOutline />, path: "/channel" },
    { id: 3, name: "Subscription", icon: <SubscriptionsOutlined />, path: "/subscriptions" },
  ];

  const sidebarItems2 = [
    { id: 1, name: "Shorts", icon: <SmartDisplayOutlined /> },
    { id: 2, name: "History", icon: <HistoryOutlined /> },
    { id: 3, name: "Playlists", icon: <PlaylistPlayOutlined /> },
    { id: 4, name: "Your Videos", icon: <VideoLibraryOutlined /> },
  ];

  const sidebarItems3 = [
    { id: 1, name: "Trending", icon: <WhatshotOutlined /> },
    { id: 2, name: "Shopping", icon: <StorefrontOutlined /> },
    { id: 3, name: "Music", icon: <MusicNoteOutlined /> },
    { id: 4, name: "Films", icon: <MovieOutlined /> },
    { id: 5, name: "Live", icon: <LiveTvOutlined /> },
    { id: 6, name: "Gaming", icon: <SportsEsportsOutlined /> },
  ];

  const sidebarItems5 = [
    { id: 1, name: "Settings", icon: <SettingsOutlined /> },
    { id: 2, name: "Report History", icon: <FlagOutlined /> },
    { id: 3, name: "Help", icon: <HelpOutline /> },
    { id: 4, name: "Send Feedback", icon: <FeedbackOutlined /> },
  ];

  return (
    <aside
      className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] z-40 overflow-y-auto
        bg-white dark:bg-gray-900 shadow-md
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0 w-64" : "-translate-x-full"}
        ${isLargeScreen ? "lg:translate-x-0 lg:w-64" : ""}
      `}
    >
      <nav className="flex flex-col justify-between h-full p-4 text-gray-700 dark:text-gray-300 text-sm">
        <div className="space-y-6">
          {/* Main Navigation */}
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <Link key={item.id} to={item.path}>
                <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  <div className="text-lg">{item.icon}</div>
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}
          </div>

          <hr className="border-gray-300 dark:border-gray-700" />

          {/* Your Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-3 px-2 text-sm font-semibold text-gray-900 dark:text-gray-200">
              <span>You</span>
              <ChevronRight />
            </div>
            {sidebarItems2.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <div className="text-lg">{item.icon}</div>
                <span>{item.name}</span>
              </div>
            ))}
          </div>

          <hr className="border-gray-300 dark:border-gray-700" />

          {/* Explore Section */}
          <div className="space-y-2">
            <div className="px-2 text-sm font-semibold text-gray-900 dark:text-gray-200">
              Explore
            </div>
            {sidebarItems3.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <div className="text-lg">{item.icon}</div>
                <span>{item.name}</span>
              </div>
            ))}
          </div>

          <hr className="border-gray-300 dark:border-gray-700" />

          {/* Settings & Feedback */}
          <div className="space-y-2">
            {sidebarItems5.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <div className="text-lg">{item.icon}</div>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-6 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
          <p>
            Terms · Privacy · Policy & Safety
            <br />
            How RrsTube works
            <br />
            Test new features
          </p>
          <p className="font-medium mt-4">© Radhey Raman Singh</p>
        </footer>
      </nav>
    </aside>
  );
};

export default Sidebar;
