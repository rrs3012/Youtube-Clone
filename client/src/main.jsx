import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { StrictMode, Suspense, lazy } from "react";
import Error from "./Components/Error.jsx";

// Lazy loading
const HomePage = lazy(() => import("./Components/HomePage.jsx"));
const UserProfile = lazy(() => import("./Components/UserProfile.jsx"));
const Video = lazy(() => import("./Components/Video.jsx"));
const SignIn = lazy(() => import("./Components/SignIn.jsx"));
const Search = lazy(() => import("./Components/Search.jsx"));
const Channel = lazy(() => import("./Components/ChannelCreation.jsx"));
const VideoUpload = lazy(() => import("./Components/VideoUpload.jsx"));

const Fallback = <p className="text-center text-lg">Loading...</p>;

// Setting up routes
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <HomePage type="random" /> },
      { path: "trends", element: <HomePage type="trend" /> },
      { path: "subscriptions", element: <HomePage type="sub" /> },
      { path: "search", element: <Search /> },
      { path: "channel", element: <Channel /> },
      { path: "signin", element: <SignIn /> },
      { path: "video/:id", element: <Video /> },
      { path: "upload", element: <VideoUpload /> },
      { path: "profile", element: <UserProfile /> },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Suspense fallback={Fallback}>
      <RouterProvider router={appRouter} />
    </Suspense>
  </StrictMode>
);
