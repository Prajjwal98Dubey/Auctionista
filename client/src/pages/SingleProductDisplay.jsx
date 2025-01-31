import { useEffect, useState } from "react";
import { SINGLE_PRODUCT_DETAILS } from "../backendapi";
import { useSearchParams } from "react-router-dom";
import { formatBidTime, formatUsageTime } from "../helpers/formatTime";

const SingleProductDisplay = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const getProductDetails = async () => {
      let productDetails = await fetch(
        SINGLE_PRODUCT_DETAILS +
          `?prodId=${searchParams.get("prodId")}&category=${searchParams.get(
            "category"
          )}`,
        {
          method: "GET",
        }
      );
      productDetails = await productDetails.json();
      console.log(productDetails);
      setProduct(productDetails.details);
      setIsLoading(false);
    };
    getProductDetails();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl transform transition-all hover:scale-[1.01]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Image Gallery */}
              <div className="p-8">
                <div className="relative h-[500px] rounded-2xl overflow-hidden group">
                  <img
                    src={product.product_images[currentImage]}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                      {product.product_images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImage(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            currentImage === index
                              ? "w-8 bg-purple-500"
                              : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-4 mt-6 overflow-x-auto pb-4">
                  {product.product_images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImage === index
                          ? "border-purple-500 scale-110"
                          : "border-transparent hover:border-purple-500"
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-8 bg-white/5 space-y-8">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-4">
                    {product.title}
                  </h1>
                  <span className="inline-block px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">
                    {product.product_category}
                  </span>
                </div>

                <div className="flex items-center space-x-4 bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${product.user_name}`}
                    alt={product.user_name}
                    className="w-14 h-14 rounded-full ring-2 ring-purple-500"
                  />
                  <div>
                    <p className="text-gray-400 text-sm">Listed by</p>
                    <p className="text-white font-medium text-lg">
                      {product.user_name}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all">
                    <p className="text-gray-400 text-sm">Original Price</p>
                    <p className="text-2xl text-white line-through">
                      ₹{product.original_price.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all">
                    <p className="text-gray-400 text-sm">Set Price</p>
                    <p className="text-2xl text-green-400 font-bold">
                      ₹{product.product_set_price.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all">
                    <p className="text-gray-400 text-sm">Usage Time</p>
                    <p className="text-white text-lg">
                      {formatUsageTime(product.usage_time)}
                    </p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all">
                    <p className="text-gray-400 text-sm">Bid Starts</p>
                    <p className="text-white text-lg">
                      {formatBidTime(product.bid_start_time)}
                    </p>
                  </div>
                </div>

                {/* {product.desc && (
                  <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all">
                    <p className="text-gray-400 text-sm">Description</p>
                    <p className="text-white mt-2">{product.desc}</p>
                  </div>
                )} */}

                <button className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-bold hover:opacity-90 transition-all transform hover:scale-105 active:scale-95">
                  Place Bid
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProductDisplay;
