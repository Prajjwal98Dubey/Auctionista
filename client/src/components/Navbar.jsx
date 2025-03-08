import { Link } from "react-router-dom";
import { FaSearch, FaBell, FaRegBookmark } from "react-icons/fa";
import { useState, useContext } from "react";
import UserInfoContext from "../context/userInfoContext";
import { DEFAULT_USER_IMAGE } from "../backendapi";
import SearchComp from "./SearchComp";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const { userInfo } = useContext(UserInfoContext);
  return (
    <nav className="fixed w-full top-0 z-50 font-inter">
      <div className="bg-gray-900/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">A</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent group-hover:from-cyan-500 group-hover:to-blue-500 transition-all duration-300">
                Auctionista
              </span>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:block flex-1 max-w-2xl mx-8">
              <div className="relative group">
                <input
                  type="text"
                  onFocus={() => setShowSearch(true)}
                  onBlur={() => setShowSearch(false)}
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-800/50 text-white placeholder-gray-400 pl-12 pr-4 py-2.5 rounded-xl border-2 border-gray-700/50 
                           focus:border-cyan-500/50 focus:ring-0 focus:outline-none
                           transition-all duration-300 group-hover:border-cyan-500/30"
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
                {showSearch && (
                  <div className="absolute top-[50px] w-full flex justify-center">
                    <SearchComp content={searchQuery} />
                  </div>
                )}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-6">
              {userInfo ? (
                <>
                  {/* Notification & Bookmarks */}
                  <div className="hidden sm:flex items-center space-x-4">
                    <button className="p-2 hover:bg-white/5 rounded-lg transition-colors duration-300">
                      <FaBell className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
                    </button>
                    <Link to="/me#bookmark">
                      <button className="p-2 hover:bg-white/5 rounded-lg transition-colors duration-300">
                        <FaRegBookmark className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
                      </button>
                    </Link>
                  </div>

                  {/* Profile Button */}
                  <Link to="/me">
                    <div className="flex items-center space-x-3 bg-white/5 px-4 py-2 rounded-xl hover:bg-white/10 transition-all duration-300 group">
                      <img
                        src={userInfo.user_photo || DEFAULT_USER_IMAGE}
                        alt="Profile"
                        className="w-8 h-8 rounded-lg border-2 border-cyan-500/50 group-hover:border-cyan-500 transition-colors duration-300"
                      />
                      <span className="hidden sm:block text-gray-300 group-hover:text-white transition-colors duration-300">
                        {userInfo.user_name}
                      </span>
                    </div>
                  </Link>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-5 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl
                             hover:from-cyan-700 hover:to-blue-700 transition-all duration-300
                             transform hover:scale-105 active:scale-95"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-4">
          <div className="relative group">
            <input
              type="text"
              onFocus={() => setShowSearch(true)}
              onBlur={() => setShowSearch(false)}
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800/50 text-white placeholder-gray-400 pl-12 pr-4 py-2.5 rounded-xl border-2 border-gray-700/50 
                       focus:border-cyan-500/50 focus:ring-0 focus:outline-none
                       transition-all duration-300 group-hover:border-cyan-500/30"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
            {showSearch && (
              <div className="absolute top-[50px] w-full flex justify-center">
                <SearchComp content={searchQuery} />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
