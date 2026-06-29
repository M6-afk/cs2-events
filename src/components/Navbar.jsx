import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { token, logout } = useAuth();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-[#0a0a0f] border-b border-[#ff5500]/30">
      <Link to="/" className="flex items-center gap-2">
        <span className="text-[#ff5500] font-black text-2xl tracking-tight">
          FRAG
        </span>
        <span className="text-white font-black text-2xl">.GG</span>
      </Link>
      <div className="flex items-center gap-6">
        {token ? (
          <>
            <Link
              to="/create-event"
              className="text-gray-400 hover:text-[#ff5500] transition-colors duration-200 text-sm font-medium"
            >
              Create Event
            </Link>
            <button
              onClick={logout}
              className="text-gray-400 hover:text-[#ff5500] transition-colors duration-200 text-sm font-medium"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/signin"
              className="text-gray-400 hover:text-[#ff5500] transition-colors duration-200 text-sm font-medium"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="text-gray-400 hover:text-[#ff5500] transition-colors duration-200 text-sm font-medium"
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
