// import { useContext, useEffect } from "react";
// import {
//   ADD_BOOKMARKS,
//   DEFAULT_USER_IMAGE,
//   DELETE_BOOKMARK,
//   DISPLAY_PRODUCTS_API,
// } from "../backendapi";
// import { useState } from "react";
// import { formatUsageTime } from "../helpers/formatTime";
// import { FaBookmark, FaRegBookmark } from "react-icons/fa";
// import { Link, useLocation } from "react-router-dom";
// import ProductCategory from "./ProductCategory";
// import { BookMarkContext } from "../context/BookMarkContext";
// import AuctionTimer from "./AuctionTimer";
// import { timeLeftForAuction } from "../helpers/auctionTimerfn";

import { useContext, useEffect, useState } from "react";
import { DISPLAY_PRODUCTS_API } from "../backendapi";
import { SelectedCategoryContext } from "../context/SelectedCategoryContext";
import { FaRegClock } from "react-icons/fa";
import AuctionTimer from "./AuctionTimer";
import { Link } from "react-router-dom";

// const ProductDisplay = () => {
//   let location = useLocation();
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState(
//     location.search ? location.search.split("=")[1] : "all"
//   );
//   const { bookMarkInfo, setBookMarkInfo } = useContext(BookMarkContext);
//   const isProductPresentinLocal = (id) => {
//     if (localStorage.getItem("auctioned-to-be") == null) return false;
//     for (let prod of [...JSON.parse(localStorage.getItem("auctioned-to-be"))]) {
//       if (prod.product_id === id) return true;
//     }
//     return false;
//   };
//   useEffect(() => {
//     const getProducts = async () => {
//       try {
//         let fetchedProducts = await fetch(
//           DISPLAY_PRODUCTS_API + `?category=${selectedCategory}`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         fetchedProducts = await fetchedProducts.json();
//         fetchedProducts.products.forEach((prod) => {
//           // console.log(timeLeftForAuction(prod.bid_start_time).toLowerCase());
//           if (
//             timeLeftForAuction(prod.bid_start_time).toLowerCase() ===
//               "coming soon" ||
//             timeLeftForAuction(prod.bid_start_time).toLowerCase() === "ongoing"
//           ) {
//             !isProductPresentinLocal(prod.product_id) &&
//               localStorage.setItem(
//                 "auctioned-to-be",
//                 localStorage.getItem("auctioned-to-be") == null
//                   ? JSON.stringify([
//                       {
//                         product_id: prod.product_id,
//                         start_price: prod.product_set_price,
//                       },
//                     ])
//                   : JSON.stringify([
//                       ...JSON.parse(localStorage.getItem("auctioned-to-be")),
//                       {
//                         product_id: prod.product_id,
//                         start_price: prod.product_set_price,
//                       },
//                     ])
//               );
//           }
//         });
//         setProducts([...fetchedProducts.products]);
//         setIsLoading(false);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getProducts();
//   }, [selectedCategory]);
//   const handleAddToBookMark = async (prod) => {
//     if (
//       bookMarkInfo.filter((p) => p.product_id === prod.product_id).length > 0
//     ) {
//       setBookMarkInfo([
//         ...bookMarkInfo.filter((p) => p.product_id !== prod.product_id),
//       ]);
//       await fetch(DELETE_BOOKMARK + `?productId=${prod.product_id}`, {
//         method: "DELETE",
//         credentials: "include",
//       });
//     } else {
//       setBookMarkInfo((prev) => [...prev, prod]);
//       await fetch(ADD_BOOKMARKS, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({ productId: prod.product_id }),
//       });
//     }
//   };
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-6 font-inter">
//       <div className="w-full mx-auto">
//         <div className="flex justify-center">
//           <ProductCategory
//             selectedCategory={selectedCategory}
//             setSelectedCategory={setSelectedCategory}
//           />
//         </div>

//         {isLoading ? (
//           <div className="font-poppins font-bold text-3xl text-white">
//             Loading...
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {products.map((product, index) => (
//               <div
//                 key={index}
//                 className="group relative backdrop-blur-lg bg-gray-800/30 border border-gray-700/50 rounded-2xl overflow-hidden
//                           hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02]"
//               >
//                 {/* <div className="absolute top-4 right-4 z-10">
//                   <span
//                     className={`
//                 px-3 py-1 rounded-full text-sm font-medium
//                 border
//                 bg-blue-500/20 text-blue-400 border-blue-500/20
//               `}
//                   >
//                     Scheduled
//                   </span>
//                 </div> */}

//                 <div className="absolute top-4 right-4 z-10">
//                   {/* <span
//                     className={`
//                 px-3 py-1 rounded-full text-sm font-medium
//                 border
//                 bg-blue-500/20 text-blue-400 border-blue-500/20 hover:bg-red-500 cursor-pointer
//               `} */}

//                   {bookMarkInfo.filter(
//                     (prod) => prod.product_id === product.product_id
//                   ).length > 0 ? (
//                     <FaBookmark
//                       className="hover:cursor-pointer w-[30px] h-[23px] text-green-400"
//                       onClick={() => handleAddToBookMark(product)}
//                     />
//                   ) : (
//                     <FaRegBookmark
//                       className="hover:cursor-pointer w-[30px] h-[23px] text-white"
//                       onClick={() => handleAddToBookMark(product)}
//                     />
//                   )}
//                   {/* </span> */}
//                 </div>
//                 <div className="absolute top-4 left-2 z-10">
//                   <AuctionTimer bid_start_time={product.bid_start_time} />
//                 </div>
//                 <div className="relative h-64 overflow-hidden">
//                   <img
//                     src={product.product_images[0]}
//                     alt="alt"
//                     className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
//                 </div>
//                 <div className="p-5 space-y-2">
//                   {
//                     // USERS INFO
//                     /* <div className="flex items-center space-x-3">
//                     <img
//                       src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
//                       alt="john"
//                       className="w-10 h-10 rounded-full ring-2 ring-purple-500"
//                     />
//                     <span className="text-gray-300 font-medium">
//                       {product.user_name}
//                     </span>
//                   </div> */
//                   }
//                   <div>
//                     <h3 className="text-xl font-bold text-white mb-[2px]">
//                       {product.product_title}
//                     </h3>
//                     {/* <span className="px-3 py-1 text-xs font-medium bg-purple-500/20 text-purple-300 rounded-full">
//                       {product.product_category.charAt(0).toUpperCase() +
//                         product.product_category.substring(
//                           1,
//                           product.product_category.length
//                         )}
//                     </span> */}
//                   </div>
//                   <div className="mb-1 flex justify-start">
//                     <h4 className="text-xs font-medium text-gray-500 flex justify-center items-center mr-[3px]">
//                       Listed By
//                     </h4>
//                     <span className="flex justify-center items-center mr-[3px]">
//                       <img
//                         src={`${
//                           product.user_photo === null || !product.user_photo
//                             ? DEFAULT_USER_IMAGE
//                             : product.user_photo
//                         }`}
//                         alt="user_photo"
//                         className="w-[20px] h-[20px] rounded-full"
//                         loading="lazy"
//                       />
//                     </span>
//                     <span className="text-[15px] font-medium text-white ml-[3px] hover:underline cursor-pointer flex justify-center items-center mr-[3px]">
//                       {product.user_name}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <div>
//                       {/* <p className="text-gray-500 text-xs">Original Price</p>
//                       <p className="text-gray-400 line-through">
//                         ₹{product.product_original_price.toLocaleString()}
//                       </p> */}
//                       <p className="text-gray-500 text-left text-xs">
//                         Usage Time
//                       </p>
//                       <p className="text-gray-300">
//                         {formatUsageTime(product.product_usage_time)}
//                       </p>
//                     </div>
//                     <div className="text-left">
//                       <p className="text-gray-500 text-xs text-left">
//                         Starting Price
//                       </p>
//                       <p className="text-green-400 font-bold text-lg">
//                         ₹{product.product_set_price.toLocaleString()}
//                       </p>
//                     </div>
//                   </div>
//                   {/* <div>
//                     <p className="text-gray-500 text-left">Usage Time</p>
//                     <p className="text-gray-300">
//                       {formatUsageTime(product.product_usage_time)}
//                     </p>
//                   </div> */}
//                   {/* <div className="">
//                     <p className="text-gray-500 text-left">Bid Starts</p>
//                     <p className="text-gray-300">
//                       {formatBidTime(product.bid_start_time)}
//                     </p>
//                   </div> */}
//                   {/* {product.product_desc && (
//                     <p className="text-gray-400 text-sm">
//                       {product.product_desc}
//                     </p>
//                   )} */}
//                   {/* {product.product_appeal && (
//                     <div className="bg-purple-900/20 border border-purple-500/20 rounded-lg p-3">
//                       <p className="text-purple-300 text-sm italic">
//                         {product.product_appeal}
//                       </p>
//                     </div>
//                   )} */}
//                   <Link
//                     to={`/product?prodId=${product.product_id}&category=${product.product_category}`}
//                   >
//                     <button
//                       className="w-full py-3 bg-gradient-to-r from-cyan-700 to-blue-700 text-white rounded-lg
//                     font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 mt-2"
//                     >
//                       View Details
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductDisplay;

const ProductDisplay = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { activeCategory } = useContext(SelectedCategoryContext);
  useEffect(() => {
    const getProducts = async () => {
      let fetchedProducts = await fetch(
        DISPLAY_PRODUCTS_API + `?category=${activeCategory}`,
        {
          method: "GET",
        }
      );
      fetchedProducts = await fetchedProducts.json();
      setProducts([...fetchedProducts.products]);
      setIsLoading(false);
    };
    getProducts();
  }, [activeCategory]);
  return (
    <>
      {!isLoading && (
        <div className="w-full px-16 font-poppins">
          <div className="grid grid-cols-4">
            {products.map((prod) => (
              <Link
                to={`/product?prodId=${prod.product_id}&category=${prod.product_category}`}
                key={prod.product_id}
              >
                <div className="w-[330px] m-2 p-2  mb-4 h-[400px] rounded-md hover:scale-105 hover:transform hover:transition-all hover:duration-300 cursor-pointer hover:shadow-xl hover:shadow-gray-500">
                  <div>
                    <img
                      src={prod.product_images[0]}
                      alt="product_image"
                      className="w-full h-[200px] rounded-md"
                    />
                  </div>
                  <div className="px-4 py-4">
                    <p className="font-medium text-left">
                      {prod.product_title}
                    </p>
                    <div>
                      <p className="text-gray-400 text-sm py-2">Current Bid</p>
                    </div>
                    <div className="font-medium">
                      <p>₹{prod.product_set_price.toLocaleString()}</p>
                    </div>
                    <div className="flex py-2">
                      <div className="mr-1 flex justify-center items-center text-gray-400">
                        <FaRegClock />
                      </div>
                      <div className="flex justify-center items-end text-[12px]">
                        <AuctionTimer bid_start_time={prod.bid_start_time} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDisplay;
