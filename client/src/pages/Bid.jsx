import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const Bid = () => {
  const [currentBid, setCurrentBid] = useState(0);
  const [highestBid, setHighestBid] = useState(1000);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [bidAmount, setBidAmount] = useState("");
  const [countdown, setCountdown] = useState(3);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("ws://localhost:5002");
      socketRef.current.emit("join-room", {
        roomId: JSON.parse(localStorage.getItem("auction")).room_id,
        userName: JSON.parse(localStorage.getItem("auction")).user_name,
      });
      socketRef.current.emit("c_updated_value", "");
    }
  }, []);
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
  // Mock data
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Organizer and Highest Bidder */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Organizer Info */}
            <div className="flex items-center space-x-4">
              <img
                src="https://imgs.search.brave.com/-BwOmmpwcOSdg2MzpXX_i5EUZ-l2E9FDHCF96Fj_Vzo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/amV3ZWxzaW50aW1l/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyNC8xMS9qaXRf/MDcxMTI0LTA4NTgw/OF84MzY4ODM2NTgt/NDUweDU4NC5qcGc"
                alt={organizer.name}
                className="w-16 h-16 rounded-full border-2 border-white/20"
              />
              <div className="text-white">
                <h3 className="text-xl font-semibold">
                  Auction by {organizer.name}
                </h3>
                <p className="text-white/60">{organizer.reputation}</p>
              </div>
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

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <img
                src="https://imgs.search.brave.com/-BwOmmpwcOSdg2MzpXX_i5EUZ-l2E9FDHCF96Fj_Vzo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/amV3ZWxzaW50aW1l/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyNC8xMS9qaXRf/MDcxMTI0LTA4NTgw/OF84MzY4ODM2NTgt/NDUweDU4NC5qcGc"
                alt={product.title}
                className="w-full h-96 object-cover rounded-lg mb-6 object-cover"
              />
              <h1 className="text-3xl font-bold text-white mb-2">
                {product.title}
              </h1>
              <p className="text-white/60">{product.description}</p>
            </div>
          </div>

          {/* Bidding Section */}
          <div className="space-y-6">
            {/* Current Bid */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
              <h2 className="text-white/80 text-xl mb-4">Current Bid</h2>
              <div className="text-6xl font-bold text-green-400 mb-4 animate-pulse">
                ${currentBid}
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

            {/* Quick Bid Buttons */}
            <div className="grid grid-cols-3 gap-4">
              {[10, 50, 100].map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleQuickBid(amount)}
                  className="bg-white/5 hover:bg-white/10 text-white py-3 rounded-lg transition-colors"
                >
                  +${amount}
                </button>
              ))}
            </div>

            {/* Bid Form */}
            <form onSubmit={handleBidSubmit} className="space-y-4">
              <input
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="Enter your bid"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-400"
                min={currentBid + 1}
                required
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity"
                disabled={isCountingDown}
              >
                {isCountingDown ? "Confirming..." : "Place Bid"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bid;

// import { useState } from "react";
// import { io } from "socket.io-client";
// const Bid = () => {
//   const [currentBid, setCurrentBid] = useState(1000);
//   const [highestBid, setHighestBid] = useState(1000);
//   const [onlineUsers] = useState(0);
//   const [bidAmount, setBidAmount] = useState("");
//   const [countdown, setCountdown] = useState(3);
//   const [isCountingDown, setIsCountingDown] = useState(false);
//   const socket = io("ws://localhost:5002");
//   console.log("socket details from client", socket);

//   // Mock data
//   const organizer = {
//     name: "John Doe",
//     image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
//     reputation: "⭐⭐⭐⭐⭐",
//   };

//   const product = {
//     title: "Vintage Rolex Submariner",
//     image: "https://example.com/watch.jpg",
//     description: "Limited Edition 1969 Model",
//   };

//   const highestBidder = {
//     name: "Alice Smith",
//     image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
//   };

//   const handleBidSubmit = async (e) => {
//     e.preventDefault();
//     setIsCountingDown(true);
//     let count = 3;
//     setCountdown(count);

//     const countdownInterval = setInterval(() => {
//       count--;
//       setCountdown(count);
//       if (count === 0) {
//         clearInterval(countdownInterval);
//         setIsCountingDown(false);
//         const newBid = parseFloat(bidAmount);
//         if (newBid > highestBid) {
//           setHighestBid(newBid);
//           setCurrentBid(newBid);
//           setBidAmount("");
//         }
//       }
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
//       <div className="container mx-auto px-4 py-8">
//         <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-8">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <img
//                 src={organizer.image}
//                 alt={organizer.name}
//                 className="w-16 h-16 rounded-full border-2 border-white/20"
//               />
//               <div className="text-white">
//                 <h3 className="text-xl font-semibold">
//                   Auction by {organizer.name}
//                 </h3>
//                 <p className="text-white/60">{organizer.reputation}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Product Details */}
//           <div className="lg:col-span-2">
//             <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
//               <img
//                 src={product.image}
//                 alt={product.title}
//                 className="w-full h-96 object-cover rounded-lg mb-6"
//               />
//               <h1 className="text-3xl font-bold text-white mb-2">
//                 {product.title}
//               </h1>
//               <p className="text-white/60">{product.description}</p>
//             </div>
//           </div>

//           {/* Bidding Section */}
//           <div className="space-y-6">
//             {/* Current Bid Display */}
//             <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
//               <h2 className="text-white/80 text-xl mb-4">Current Bid</h2>
//               <div className="text-6xl font-bold text-green-400 mb-4 animate-pulse">
//                 ${currentBid}
//               </div>
//               {isCountingDown && (
//                 <div className="text-5xl font-bold text-white animate-pulse">
//                   {countdown}
//                 </div>
//               )}
//             </div>

//             {/* Highest Bidder */}
//             <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
//               <p className="text-white/80 mb-4">Highest Bidder</p>
//               <div className="flex items-center space-x-4">
//                 <img
//                   src={highestBidder.image}
//                   alt={highestBidder.name}
//                   className="w-12 h-12 rounded-full"
//                 />
//                 <div>
//                   <p className="text-white font-semibold">
//                     {highestBidder.name}
//                   </p>
//                   <p className="text-green-400">${highestBid}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-2 gap-4">
//               <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
//                 <p className="text-white/60">Online Users</p>
//                 <p className="text-2xl font-bold text-white">{onlineUsers}</p>
//               </div>
//               <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4">
//                 <p className="text-white/60">Total Bids</p>
//                 <p className="text-2xl font-bold text-white">24</p>
//               </div>
//             </div>

//             {/* Bid Controls */}
//             <form onSubmit={handleBidSubmit} className="space-y-4">
//               <input
//                 type="number"
//                 value={bidAmount}
//                 onChange={(e) => setBidAmount(e.target.value)}
//                 placeholder="Enter your bid"
//                 className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-400"
//                 min={currentBid + 1}
//                 required
//               />
//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity"
//                 disabled={isCountingDown}
//               >
//                 {isCountingDown ? "Confirming..." : "Place Bid"}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Bid;

// import { useState } from "react";

// const Bid = () => {
//   const [currentBid, setCurrentBid] = useState(1000);
//   const [highestBid, setHighestBid] = useState(1000);
//   const [onlineUsers] = useState(0);
//   const [bidAmount, setBidAmount] = useState("");

//   const handleBidSubmit = (e) => {
//     e.preventDefault();
//     const newBid = parseFloat(bidAmount);
//     if (newBid > highestBid) {
//       setHighestBid(newBid);
//       setCurrentBid(newBid);
//       setBidAmount("");
//     }
//   };

//   const quickBidAmounts = [100, 500, 1000, 5000];

//   return (
//     <div className="min-h-screen bg-[#0F172A] relative overflow-hidden">
//       {/* Animated background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-700/30 via-purple-500/30 to-teal-400/30 animate-gradient"></div>

//       <div className="container mx-auto px-4 py-8 relative z-10">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 text-white border border-white/20">
//             <p className="text-sm uppercase tracking-wider">Online Users</p>
//             <p className="text-4xl font-bold mt-2">{onlineUsers}</p>
//           </div>

//           <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 text-white border border-white/20">
//             <p className="text-sm uppercase tracking-wider">Highest Bid</p>
//             <p className="text-4xl font-bold mt-2 text-green-400">
//               ${highestBid}
//             </p>
//           </div>

//           <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 text-white border border-white/20 lg:col-span-1 md:col-span-2">
//             <p className="text-sm uppercase tracking-wider">Time Remaining</p>
//             <p className="text-4xl font-bold mt-2">02:45:30</p>
//           </div>
//         </div>

//         {/* Main Bid Section */}
//         <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20">
//           <div className="text-center mb-12">
//             <h2 className="text-2xl text-white/80 mb-4">Current Bid</h2>
//             <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 animate-pulse">
//               ${currentBid}
//             </div>
//           </div>

//           {/* Bid Controls */}
//           <div className="max-w-2xl mx-auto">
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
//               {quickBidAmounts.map((amount) => (
//                 <button
//                   key={amount}
//                   onClick={() => setBidAmount(currentBid + amount)}
//                   className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all"
//                 >
//                   +${amount}
//                 </button>
//               ))}
//             </div>

//             <form onSubmit={handleBidSubmit} className="space-y-4">
//               <input
//                 type="number"
//                 value={bidAmount}
//                 onChange={(e) => setBidAmount(e.target.value)}
//                 placeholder="Enter custom bid amount"
//                 min={currentBid + 1}
//                 step="0.01"
//                 className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 required
//               />
//               <button
//                 type="submit"
//                 className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity"
//               >
//                 Place Bid
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Bid;
