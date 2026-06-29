import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { token, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-orange-500 px-6 py-4 flex items-center justify-between">
      <Link
        to="/"
        className="text-orange-500 font-bold text-xl tracking-widest"
      >
        CS2 EVENTS
      </Link>

      <div className="flex gap-4">
        {token ? (
          <>
            <Link
              to="/create-event"
              className="text-gray-800 hover:text-orange-500 transition"
            >
              Create Event
            </Link>
            <button
              onClick={logout}
              className="text-gray-800 hover:text-orange-500 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/signin"
              className="text-gray-800 hover:text-orange-500 transition"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="text-gray-800 hover:text-orange-500 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
