/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { formatUsageTime } from "../helpers/formatTime";

const ListedProduct = ({ prod }) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:transform hover:scale-[1.02] group font-inter">
      <div className="relative h-48 overflow-hidden">
        <img
          src={prod.product_images[0]}
          alt={prod.product_title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"></div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-500 border border-purple-600/20">
            {prod.product_category.charAt(0).toUpperCase() +
              prod.product_category.substring(1, prod.product_category.length)}
          </span>
        </div>
      </div>
      <div className="p-5 space-y-3">
        <h3 className="text-xl font-bold text-white truncate">
          {prod.product_title}
        </h3>

        <div className="flex justify-between">
          <div>
            <p className="text-gray-400 text-xs">Usage Time</p>
            <p className="text-gray-300">
              {formatUsageTime(prod.product_usage_time)}
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Starting Price</p>
            <p className="text-green-400 font-bold text-lg">
              ₹{prod.product_set_price.toLocaleString()}
            </p>
          </div>
        </div>

        <Link
          to={`/product?prodId=${prod.product_id}&category=${prod.product_category}`}
          className="block w-full"
        >
          <button
            className="w-full py-3 mt-2 bg-gradient-to-r from-cyan-700 to-blue-700 
                           text-white rounded-lg font-medium
                           hover:shadow-lg hover:shadow-purple-500/20 
                           transition-all duration-300 transform 
                           hover:scale-[1.02] active:scale-[0.98]"
          >
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ListedProduct;
