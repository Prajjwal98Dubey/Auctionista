import { useEffect } from "react";
import { DEFAULT_USER_IMAGE, DISPLAY_PRODUCTS_API } from "../backendapi";
import { useState } from "react";
import { formatUsageTime } from "../helpers/formatTime";
import { FaRegBookmark } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import ProductCategory from "./ProductCategory";

const ProductDisplay = () => {
  let location = useLocation();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(
    location.search ? location.search.split("=")[1] : "all"
  );
  useEffect(() => {
    const getProducts = async () => {
      try {
        let fetchedProducts = await fetch(
          DISPLAY_PRODUCTS_API + `?category=${selectedCategory}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        fetchedProducts = await fetchedProducts.json();
        setProducts([...fetchedProducts.products]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-6 font-inter">
      <div className="w-full mx-auto">
        <ProductCategory
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {isLoading ? (
          <div className="font-poppins font-bold text-3xl text-white">
            Loading...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="group relative backdrop-blur-lg bg-gray-800/30 border border-gray-700/50 rounded-2xl overflow-hidden 
                          hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02]"
              >
                {/* <div className="absolute top-4 right-4 z-10">
                  <span
                    className={`
                px-3 py-1 rounded-full text-sm font-medium
                border
                bg-blue-500/20 text-blue-400 border-blue-500/20
              `}
                  >
                    Scheduled
                  </span>
                </div> */}

                <div className="absolute top-4 right-4 z-10">
                  {/* <span
                    className={`
                px-3 py-1 rounded-full text-sm font-medium
                border
                bg-blue-500/20 text-blue-400 border-blue-500/20 hover:bg-red-500 cursor-pointer
              `} */}
                  <FaRegBookmark className="hover:cursor-pointer w-[30px] h-[23px]" />
                  {/* </span> */}
                </div>
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.product_images[0]}
                    alt="alt"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                </div>
                <div className="p-5 space-y-2">
                  {
                    // USERS INFO
                    /* <div className="flex items-center space-x-3">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                      alt="john"
                      className="w-10 h-10 rounded-full ring-2 ring-purple-500"
                    />
                    <span className="text-gray-300 font-medium">
                      {product.user_name}
                    </span>
                  </div> */
                  }
                  <div>
                    <h3 className="text-xl font-bold text-white mb-[2px]">
                      {product.product_title}
                    </h3>
                    {/* <span className="px-3 py-1 text-xs font-medium bg-purple-500/20 text-purple-300 rounded-full">
                      {product.product_category.charAt(0).toUpperCase() +
                        product.product_category.substring(
                          1,
                          product.product_category.length
                        )}
                    </span> */}
                  </div>
                  <div className="mb-1 flex justify-start">
                    <h4 className="text-xs font-medium text-gray-500 flex justify-center items-center mr-[3px]">
                      Listed By
                    </h4>
                    <span className="flex justify-center items-center mr-[3px]">
                      <img
                        src={`${
                          product.user_photo === null || !product.user_photo
                            ? DEFAULT_USER_IMAGE
                            : product.user_photo
                        }`}
                        alt="user_photo"
                        className="w-[20px] h-[20px] rounded-full"
                        loading="lazy"
                      />
                    </span>
                    <span className="text-[15px] font-medium text-white ml-[3px] hover:underline cursor-pointer flex justify-center items-center mr-[3px]">
                      {product.user_name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      {/* <p className="text-gray-500 text-xs">Original Price</p>
                      <p className="text-gray-400 line-through">
                        ₹{product.product_original_price.toLocaleString()}
                      </p> */}
                      <p className="text-gray-500 text-left text-xs">
                        Usage Time
                      </p>
                      <p className="text-gray-300">
                        {formatUsageTime(product.product_usage_time)}
                      </p>
                    </div>
                    <div className="text-left">
                      <p className="text-gray-500 text-xs text-left">
                        Starting Price
                      </p>
                      <p className="text-green-400 font-bold text-lg">
                        ₹{product.product_set_price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {/* <div>
                    <p className="text-gray-500 text-left">Usage Time</p>
                    <p className="text-gray-300">
                      {formatUsageTime(product.product_usage_time)}
                    </p>
                  </div> */}
                  {/* <div className="">
                    <p className="text-gray-500 text-left">Bid Starts</p>
                    <p className="text-gray-300">
                      {formatBidTime(product.bid_start_time)}
                    </p>
                  </div> */}
                  {/* {product.product_desc && (
                    <p className="text-gray-400 text-sm">
                      {product.product_desc}
                    </p>
                  )} */}
                  {/* {product.product_appeal && (
                    <div className="bg-purple-900/20 border border-purple-500/20 rounded-lg p-3">
                      <p className="text-purple-300 text-sm italic">
                        {product.product_appeal}
                      </p>
                    </div>
                  )} */}
                  <Link
                    to={`/product?prodId=${product.product_id}&category=${product.product_category}`}
                  >
                    <button
                      className="w-full py-3 bg-gradient-to-r from-cyan-700 to-blue-700 text-white rounded-lg 
                    font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 mt-2"
                    >
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDisplay;
