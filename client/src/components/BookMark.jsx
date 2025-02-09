import { useContext } from "react";
import { FaTrash, FaRegHeart, FaClock } from "react-icons/fa";
import { BookMarkContext } from "../context/BookMarkContext";
import { Link } from "react-router-dom";

const BookMark = () => {
  const { bookMarkInfo, setBookMarkInfo } = useContext(BookMarkContext);

  const handleDelete = (id) => {
    setBookMarkInfo(
      bookMarkInfo.filter((bookmark) => bookmark.product_id !== id)
    );
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-6 rounded-[25px] mt-[10px] font-inter">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Watch List
          </h2>
          <span className="text-gray-400">
            {bookMarkInfo.length} {bookMarkInfo.length === 1 ? "item" : "items"}
          </span>
        </div>
        <div className="grid gap-6">
          {bookMarkInfo.map((bookmark, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden 
                       border border-white/10 hover:border-cyan-500/30 
                       transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-48 h-48 overflow-hidden">
                  <img
                    src={bookmark.product_images[0]}
                    alt={bookmark.product_title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                        {bookmark.product_title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 bg-cyan-500/10 rounded-full text-xs font-medium text-cyan-400">
                          {bookmark.product_category}
                        </span>
                      </div>
                      <p className="text-2xl text-green-400 font-bold">
                        ₹{bookmark.product_set_price.toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(bookmark.product_id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg transition-all duration-300 
                               hover:shadow-lg hover:shadow-red-500/10 group/delete"
                    >
                      <FaTrash
                        className="w-5 h-5 text-red-400 group-hover/delete:text-red-500 
                                        transform group-hover/delete:scale-110 transition-all duration-300"
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center space-x-2">
                      <FaRegHeart className="w-5 h-5 text-cyan-400" />
                      <span className="text-gray-400 text-sm">
                        {Math.floor(Math.random() * 50)} people bookmarked
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 rounded-lg">
                      <FaClock className="w-4 h-4 text-cyan-400" />
                      <span className="text-cyan-400 font-medium text-sm">
                        2 days left
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/product?prodId=${bookmark.product_id}&category=${bookmark.product_category}`}
                    className="mt-4 block"
                  >
                    <button
                      className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 
                                     text-white rounded-lg font-medium
                                     hover:from-cyan-600 hover:to-blue-600
                                     transition-all duration-300 transform 
                                     hover:scale-[1.02] active:scale-[0.98]"
                    >
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {bookMarkInfo.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 text-gray-600">
              <FaRegHeart className="w-full h-full" />
            </div>
            <p className="text-gray-400 text-lg mb-4">No bookmarks yet</p>
            <Link to="/">
              <button
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 
                               text-white rounded-lg font-medium hover:from-cyan-600 
                               hover:to-blue-600 transition-all duration-300"
              >
                Browse Products
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookMark;
