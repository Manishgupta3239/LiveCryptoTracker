import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-xl mt-4 text-gray-700">Oops! Page not found.</p>
        <p className="text-md text-gray-500 mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-full transition"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
