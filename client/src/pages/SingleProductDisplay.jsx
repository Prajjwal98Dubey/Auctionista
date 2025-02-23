import { useEffect, useState } from "react";
import { DEFAULT_USER_IMAGE, SINGLE_PRODUCT_DETAILS } from "../backendapi";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { formatBidTime, formatUsageTime } from "../helpers/formatTime";
import ProductInfoComp from "../custom-tag/ProductInfoComp";
import { attributesToComponent } from "../helpers/mapCategoryToOptions";
import { timeLeftForAuction } from "../helpers/auctionTimerfn";

const SingleProductDisplay = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [auctionStatus, setAuctionStatus] = useState(false); // false => auction completed.
  const location = useLocation();
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
      setProduct(productDetails.details);
      let status = timeLeftForAuction(productDetails.details.bid_start_time);
      if (
        status.toLocaleLowerCase() === "scheduled" ||
        status.toLocaleLowerCase() === "coming soon" ||
        status.toLocaleLowerCase() === "ongoing"
      ) {
        setAuctionStatus(true);
      }
      setIsLoading(false);
    };
    getProductDetails();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 py-12 px-4 sm:px-6 lg:px-8 font-inter">
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl transform transition-all hover:scale-[1.01]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                              ? "w-8 bg-cyan-500"
                              : "bg-white/50"
                          }`}
                        />
                      ))}
                      {console.log(
                        JSON.parse(
                          localStorage.getItem("auctioned-to-be")
                        ).filter(
                          (prod) =>
                            prod.product_id ===
                            location.search
                              .substring(1)
                              .split("&")[0]
                              .split("=")[1]
                        )[0].start_price
                      )}
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
                          ? "border-cyan-500 scale-110"
                          : "border-transparent hover:border-cyan-500"
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
                  <h1 className=" text-xl sm:text-4xl font-bold text-white mb-4">
                    {product.title}
                  </h1>
                </div>

                <div className=" flex items-center space-x-4 bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all">
                  <img
                    src={
                      product.user_photo === null || !product.user_photo
                        ? DEFAULT_USER_IMAGE
                        : product.user_photo
                    }
                    alt={product.user_name}
                    className="w-14 h-14 rounded-full ring-2 ring-cyan-500"
                  />
                  <div className="">
                    <p className="text-gray-400 text-[12px] sm:text-sm">
                      Listed by
                    </p>
                    <p className="text-white font-medium text-[15px] sm:text-lg">
                      {product.user_name.charAt(0).toUpperCase() +
                        product.user_name.substring(
                          1,
                          product.user_name.length
                        )}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all">
                    <p className="text-gray-400 text-[12px] sm:text-sm">
                      Original Price
                    </p>
                    <p className="text-[18px] sm:text-2xl text-white line-through font-bold">
                      ₹{product.original_price.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all">
                    <p className="text-gray-400 text-[12px] sm:text-sm">
                      Starting Price
                    </p>
                    <p className="text-[18px] sm:text-2xl text-green-500 font-bold">
                      ₹{product.product_set_price.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all">
                    <p className="text-gray-400 text-[12px] sm:text-sm">
                      Usage Time
                    </p>
                    <p className="text-white text-[20px] sm:text-2xl">
                      {formatUsageTime(product.usage_time)}
                    </p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-all">
                    <p className="text-gray-400 text-[12px] sm:text-sm">
                      Bid Starts
                    </p>
                    <p className="text-white text-[13px] sm:text-lg">
                      {formatBidTime(product.bid_start_time)}
                    </p>
                  </div>
                </div>
                <Link to={"/bid" + location.search}>
                  <button
                    className={`w-full  py-4 bg-gradient-to-r ${
                      auctionStatus
                        ? "from-cyan-700 to-blue-700 hover:shadow-lg hover:shadow-cyan-500/30 hover:opacity-90 hover:scale-105 active:scale-95 cursor-pointer"
                        : "from-gray-500 to-gray-600 cursor-not-allowed"
                    }  text-white rounded-lg 
                    font-bold   duration-300 mt-2  transition-all transform `}
                    disabled={auctionStatus == false}
                  >
                    {auctionStatus ? "Place Bid" : "Auction Over"}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="max-w-7xl mx-auto mt-12 font-inter">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl p-8 ">
          <h2 className="text-3xl sm:text-xl font-extrabold mb-6 b text-cyan-700 ">
            Additional Information
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-800/20">Feature</th>
                  <th className="py-2 px-4 bg-gray-800/20">Details</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(product).map(
                  ([key, value]) =>
                    ![
                      "product_images",
                      "title",
                      "user_name",
                      "user_photo",
                    ].includes(key) &&
                    value !== null &&
                    value.toString().length >= 1 && (
                      <tr key={key} className="bg-gray-800/20">
                        <td className="py-2 px-4 text-[12px] sm:text-sm">
                          {attributesToComponent[key]}
                        </td>
                        <ProductInfoComp prodKey={key} value={value} />
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductDisplay;
