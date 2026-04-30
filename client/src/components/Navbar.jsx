import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/books" className="text-xl font-bold text-blue-600">
          📚 CampusSwap
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/books"
            className={`text-sm font-medium transition
              ${isActive('/books') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
            Browse Books
          </Link>
          <Link to="/notes"
            className={`text-sm font-medium transition
              ${isActive('/notes') ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'}`}>
            Notes & PYQs
          </Link>
          <Link to="/add-book"
            className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition">
            + List Book
          </Link>
          <Link to="/upload-note"
            className="bg-purple-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-purple-700 transition">
            + Upload Note
          </Link>
          <Link to="/profile"
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            {user?.name?.split(' ')[0]}
          </Link>
          <button onClick={handleLogout}
            className="text-sm text-red-500 hover:text-red-700 font-medium">
            Logout
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-600 focus:outline-none">
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-3">
          <Link to="/books" onClick={() => setMenuOpen(false)}
            className="block text-sm font-medium text-gray-700 hover:text-blue-600">
            📚 Browse Books
          </Link>
          <Link to="/notes" onClick={() => setMenuOpen(false)}
            className="block text-sm font-medium text-gray-700 hover:text-purple-600">
            📝 Notes & PYQs
          </Link>
          <Link to="/add-book" onClick={() => setMenuOpen(false)}
            className="block text-sm font-medium text-gray-700 hover:text-blue-600">
            + List a Book
          </Link>
          <Link to="/upload-note" onClick={() => setMenuOpen(false)}
            className="block text-sm font-medium text-gray-700 hover:text-purple-600">
            + Upload Note
          </Link>
          <Link to="/profile" onClick={() => setMenuOpen(false)}
            className="block text-sm font-medium text-gray-700 hover:text-blue-600">
            👤 My Profile
          </Link>
          <button onClick={handleLogout}
            className="block text-sm font-medium text-red-500 hover:text-red-700">
            🚪 Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;