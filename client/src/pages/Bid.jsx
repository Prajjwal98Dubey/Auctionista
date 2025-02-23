import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { SINGLE_PRODUCT_DETAILS } from "../backendapi";
import { DEFAULT_USER_IMAGE } from "../icons/icons";
import AuctionTimer from "../components/AuctionTimer";
import { timeLeftForAuction } from "../helpers/auctionTimerfn";

const Bid = () => {
  const [currentBid, setCurrentBid] = useState("");
  const [highestBid, setHighestBid] = useState(1000);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [bidAmount, setBidAmount] = useState("");
  const [countdown, setCountdown] = useState(3);
  const [productDetails, setProductDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const socketRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const getBiddingProductDetail = async () => {
      let resDetails = await fetch(SINGLE_PRODUCT_DETAILS + location.search, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      resDetails = await resDetails.json();
      setProductDetails({ ...resDetails.details });
      setCurrentBid(resDetails.details.product_set_price);
      setIsLoading(false);
    };
    getBiddingProductDetail();
  }, [location]);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("ws://localhost:5002");
      socketRef.current.emit("join-room", {
        roomId: JSON.parse(localStorage.getItem("auction")).room_id,
        userName: JSON.parse(localStorage.getItem("auction")).user_name,
        roomInitBidValue: JSON.parse(
          localStorage.getItem("auctioned-to-be")
        ).filter(
          (prod) =>
            prod.product_id ===
            location.search.substring(1).split("&")[0].split("=")[1]
        )[0].start_price,
      });
      socketRef.current.emit("c_updated_value", "");
    }
  }, [location.search]);
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("s_new_bid", ({ newPrice }) => {
        setCurrentBid(newPrice);
      });
      socketRef.current.on("online_users", ({ online_user }) => {
        setOnlineUsers(online_user);
      });
      socketRef.current.on("s_updated_value", (payload) => {
        console.log("payload", payload);
        setCurrentBid(parseInt(payload));
      });
    }
  });

  const organizer = {
    name: "John Doe",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    reputation: "⭐⭐⭐⭐⭐",
  };

  const product = {
    title: "Vintage Rolex Submariner",
    image: "https://example.com/watch.jpg",
    description: "Limited Edition 1969 Model",
  };

  const highestBidder = {
    name: "Alice Smith",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
  };

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    setIsCountingDown(true);
    let count = 3;
    setCountdown(count);
    const countdownInterval = setInterval(() => {
      count--;
      setCountdown(count);
      if (count === 0) {
        clearInterval(countdownInterval);
        setIsCountingDown(false);
        socketRef.current.emit("c_new_bid", {
          userName: JSON.parse(localStorage.getItem("auction")).user_name,
          newPrice: parseInt(bidAmount),
          roomId: JSON.parse(localStorage.getItem("auction")).room_id,
        });
        setBidAmount("");
      }
    }, 1000);
  };

  const handleQuickBid = (increment) => {
    setBidAmount(currentBid + increment);
  };

  return (
    <>
      {!isLoading && (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 p-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={
                      productDetails.user_photo
                        ? productDetails.user_photo
                        : DEFAULT_USER_IMAGE
                    }
                    alt={productDetails.user_name}
                    className="w-16 h-16 rounded-full border-2 border-white/20"
                  />
                  <div className="text-white">
                    <h3 className="text-xl font-semibold">
                      Auction by {productDetails.user_name}
                    </h3>
                    <p className="text-white/60">{organizer.reputation}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 bg-white/5 rounded-xl p-4">
                  <AuctionTimer
                    bid_start_time={productDetails.bid_start_time}
                  />
                </div>
                {/* Highest Bidder Info */}
                <div className="flex items-center space-x-4 bg-white/5 rounded-xl p-4">
                  <img
                    src={highestBidder.image}
                    alt={highestBidder.name}
                    className="w-16 h-16 rounded-full border-2 border-green-400"
                  />
                  <div className="text-white">
                    <h3 className="text-lg">Highest Bidder</h3>
                    <p className="font-semibold">{highestBidder.name}</p>
                    <p className="text-green-400 font-bold">${highestBid}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                  <img
                    src={productDetails.product_images[0]}
                    alt={productDetails.title}
                    className="w-full h-96 object-cover rounded-lg mb-6 "
                  />
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {productDetails.title}
                  </h1>
                  <p className="text-white/60">
                    {productDetails.description && productDetails.description}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
                  <h2 className="text-white/80 text-xl mb-4">Current Bid</h2>
                  <div className="text-6xl font-bold text-green-400 mb-4 animate-pulse">
                    ₹{currentBid.toLocaleString()}
                  </div>
                  {isCountingDown && (
                    <div className="text-5xl font-bold text-white animate-pulse">
                      {countdown}
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
                    <p className="text-white/60 text-center">Online Users</p>
                    <p className="text-2xl font-bold text-white text-center">
                      {onlineUsers}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[10, 50, 100].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleQuickBid(amount)}
                      className="bg-white/5 hover:bg-white/10 text-white py-3 rounded-lg transition-colors"
                    >
                      +₹{amount}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleBidSubmit} className="space-y-4">
                  <input
                    type="number"
                    disabled={
                      timeLeftForAuction(
                        productDetails.bid_start_time
                      ).toLowerCase() != "ongoing"
                    }
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder="Enter your bid"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-400"
                    min={currentBid + 1}
                    required
                  />
                  <button
                    type="submit"
                    className={`w-full bg-gradient-to-r ${
                      timeLeftForAuction(
                        productDetails.bid_start_time
                      ).toLowerCase() == "ongoing"
                        ? "from-green-400 to-blue-500 hover:opacity-90 transition-opacity cursor-pointer"
                        : "from-gray-400 to-gray-600 cursor-not-allowed"
                    } text-white font-bold py-3 rounded-lg `}
                    disabled={
                      isCountingDown ||
                      timeLeftForAuction(
                        productDetails.bid_start_time
                      ).toLowerCase() !== "ongoing"
                    }
                  >
                    {isCountingDown ? "Confirming..." : "Place Bid"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Bid;
