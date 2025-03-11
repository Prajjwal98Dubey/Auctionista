import { useEffect, useState } from "react";
import { DEFAULT_USER_IMAGE, SINGLE_PRODUCT_DETAILS } from "../backendapi";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { formatBidTime, formatUsageTime } from "../helpers/formatTime";
import ProductInfoComp from "../custom-tag/ProductInfoComp";
import { attributesToComponent } from "../helpers/mapCategoryToOptions";
import { timeLeftForAuction } from "../helpers/auctionTimerfn";
import {
  FaArrowCircleLeft,
  FaBalanceScaleLeft,
  FaLongArrowAltLeft,
  FaRegHandPointLeft,
} from "react-icons/fa";

/*

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
                    {product.title} sad;lkasl;dk
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
                    <p className="text-[18px] sm:text-2xl text-white font-bold">
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


*/

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
    <>
      {!isLoading && (
        <div className="max-w-7xl px-4 py-8 mx-auto  font-poppins">
          {console.log(product)}
          <div className="flex hover:text-black cursor-pointer text-[#64748B] w-fit">
            <div className="flex justify-center items-center p-1 ">
              <FaLongArrowAltLeft />
            </div>
            <div className="flex justify-center items-center">
              Back to all auctions
            </div>
          </div>
          <div className="grid grid-cols-2 gap-12">
            <div className="py-2">
              <img
                src={product.product_images[currentImage]}
                alt="prod_img"
                className="w-[600px] h-[600px] "
              />
              <div className="flex px-2 py-4 ">
                {product.product_images.map((prod, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className="flex justify-center items-center cursor-pointer mx-1"
                  >
                    <img
                      className={`w-[75px] h-[75px] rounded-md p-[3px] ${
                        currentImage === index ? "border border-blue-600" : null
                      }`}
                      src={prod}
                      alt="prod_image"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="w-fit h-fit px-2 py-2 bg-[#f1f5f9] text-sm rounded-md my-1">
                {product.product_category.charAt(0).toUpperCase() +
                  product.product_category.substring(1)}
              </div>
              <div className="w-full h-fit py-4 max-h-[72px] text-2xl font-bold">
                {product.title}
              </div>
              <div className="border border-gray-300 h-fit p-2 w-full rounded-xl ">
                <div className="flex items-center justify-between">
                  <div className="px-2">
                    <div className="text-sm text-[#64748B]">Current Bid</div>
                    <div className="font-bold text-[21px]">
                      ₹{product.product_set_price.toLocaleString()}
                    </div>
                    <div className="text-sm text-[#64748B]">
                      Original Price : ₹
                      {product.original_price.toLocaleString()}
                    </div>
                  </div>
                  <div className="px-2">
                    <div className="text-sm text-[#64748B] flex justify-end">
                      0 bids
                    </div>
                    <div className="font-medium text-sm flex justify-end text-[#D97706]">
                      23h 14m 55s left
                    </div>
                    <div className="text-sm text-[#64748B] flex justify-end">
                      24 watching
                    </div>
                  </div>
                </div>
                <div className="flex py-2">
                  <div className="px-2">
                    <button className="bg-[#2563EB] text-white w-[278px] h-fit p-2 rounded-md hover:bg-opacity-85 font-medium">
                      Place bid
                    </button>
                  </div>
                  <div className="px-2">
                    <button className="bg-[#2563EB] text-white w-[278px] h-fit p-2 rounded-md hover:bg-opacity- font-medium">
                      Watch Auction
                    </button>
                  </div>
                </div>
              </div>
              <div className="py-3">
                <div className="font-medium text-2xl">Seller Information</div>
                <div className="py-2 flex justify-between">
                  <div className="flex gap-3 px-1">
                    <div className="flex justify-center items-center">
                      <img
                        className="w-[38px] h-[38px] rounded-full"
                        src={
                          product.user_photo
                            ? product.user_photo
                            : DEFAULT_USER_IMAGE
                        }
                        alt="user_image"
                      />
                    </div>
                    <div className="flex justify-center items-center font-medium">
                      {product.user_name}
                    </div>
                  </div>
                  <div>
                    <div className="px-1">
                      <button className="border border-[#64748B] px-3 w-fit h-fit rounded-md hover:bg-[#c4d7ef]">
                        contact
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProductDisplay;
