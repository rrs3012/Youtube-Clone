import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  console.log("Route Error:", err);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 font-['Inter']">
      <div className="max-w-md mx-auto text-center bg-gray-200 rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-white bg-gray-600 rounded-md p-4">
          Oops, Something Broke!
        </h1>
        <h2 className="text-2xl text-gray-600 mt-4">
          {err?.status} - {err?.statusText || "Something went wrong"}
        </h2>
        <p className="text-lg text-gray-400 italic mt-2">
          {err?.data ? err.data : "Looks like this page is missing or broken."}
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-red-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-red-700 hover:shadow-lg transition duration-300"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default Error;