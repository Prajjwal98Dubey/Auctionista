import { useContext } from "react";
import { FaTrash, FaRegHeart, FaShoppingBag } from "react-icons/fa";
import { BookMarkContext } from "../context/BookMarkContext";
import { Link } from "react-router-dom";
import { DELETE_BOOKMARK } from "../backendapi";
import AuctionTimer from "./AuctionTimer";

const BookMark = () => {
  const { bookMarkInfo, setBookMarkInfo } = useContext(BookMarkContext);

  const handleDelete = async (id) => {
    setBookMarkInfo(
      bookMarkInfo.filter((bookmark) => bookmark.product_id !== id)
    );
    await fetch(DELETE_BOOKMARK + `?productId=${id}`, {
      method: "DELETE",
      credentials: "include",
    });
  };

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8 w-full mt-[10px] rounded-[20px]">
      <div className="w-full mx-auto mb-12">
        {console.log(bookMarkInfo)}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-5 border border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="w-full h-full">
              <h1 className="text-xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2 flex justify-center items-center">
                My Watchlist
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookMarkInfo.map((bookmark, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 
                         hover:border-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10"
            >
              <div className="relative">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={bookmark.product_images[0]}
                    alt={bookmark.product_title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent"></div>
                </div>

                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => handleDelete(bookmark.product_id)}
                    className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-full transition-all duration-300 
                             group/delete"
                  >
                    <FaTrash className="w-4 h-4 text-red-400 group-hover/delete:text-red-300" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {bookmark.product_title}
                      </h3>
                      <p className="text-2xl font-bold text-green-400">
                        ₹{bookmark.product_set_price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* <div className="flex items-center space-x-1">
                        <FaRegHeart className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-gray-400">
                          {Math.floor(Math.random() * 50)}
                        </span>
                      </div> */}
                      <div className="flex items-center">
                        <div className="w-[70px] h-[30px] flex justify-center items-center">
                          <AuctionTimer
                            bid_start_time={bookmark.bid_start_time}
                          />
                        </div>
                      </div>
                    </div>

                    <Link
                      to={`/product?prodId=${bookmark.product_id}&category=${bookmark.product_category}`}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 
                               rounded-lg text-white font-medium text-sm hover:from-cyan-600 hover:to-blue-600 
                               transition-all duration-300 transform hover:scale-105 active:scale-95"
                    >
                      <FaShoppingBag className="w-4 h-4 mr-2" />
                      View Item
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {bookMarkInfo.length === 0 && (
          <div className="text-center py-20 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
            <div className="w-[35px] h-[35px] sm:w-[50px] sm:h-[50px] mx-auto mb-6 text-cyan-400">
              <FaRegHeart className="w-full h-full" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              No items saved yet
            </h3>
            <p className="text-gray-400 mb-8 text-xl sm:text-2xl">
              Start adding items to your watchlist!
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 
                         rounded-xl text-white font-medium hover:from-cyan-600 hover:to-blue-600 
                         transition-all duration-300 transform hover:scale-105 text-[17px] sm:text-xl"
            >
              <FaShoppingBag className="w-5 h-5 mr-2" />
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookMark;
