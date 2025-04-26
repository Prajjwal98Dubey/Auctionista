import { useEffect, useState } from "react";
import {
  HeartOutlineIcon,
  RemoveIcon,
  SmallUserIcon,
  SmallWatchListIcon,
  WatchListIcon,
} from "../icons/Icons";

const ProductDisplay = ({ items }) => {
  const [showWatchListBtn, setShowWatchListBtn] = useState(
    new Array(items.length).fill(false)
  );
  const [watchList, setWatchList] = useState(
    localStorage.getItem("auction-watchlist")
      ? JSON.parse(localStorage.getItem("auction-watchlist"))
      : []
  );
  useEffect(() => {
    if (items && items.length) {
      setShowWatchListBtn(new Array(items.length).fill(false));
    }
  }, [items]);

  const addToWatchList = (id) => {
    if (localStorage.getItem("auction-watchlist")) {
      localStorage.setItem(
        "auction-watchlist",
        JSON.stringify([
          ...JSON.parse(localStorage.getItem("auction-watchlist")),
          id,
        ])
      );
    } else {
      localStorage.setItem("auction-watchlist", JSON.stringify([id]));
    }
    setWatchList([...JSON.parse(localStorage.getItem("auction-watchlist"))]);
  };
  const removeFromWatchList = (id) => {
    let updatedWatchList = JSON.parse(
      localStorage.getItem("auction-watchlist")
    ).filter((prodId) => prodId !== id);
    localStorage.setItem(
      "auction-watchlist",
      JSON.stringify([...updatedWatchList])
    );
    setWatchList([...updatedWatchList]);
  };

  return (
    <>
      <div
        className="hidden w-full lg:grid lg:grid-cols-4 py-2 px-2 lg my-2 mx-1 h-fit font-kanit
    "
      >
        {items.length === 0 ? (
          <div className="flex justify-center items-center font-bold font-kanit text-[#313131]">
            no items found...
          </div>
        ) : (
          items.map((item, index) => (
            <div
              onMouseEnter={() =>
                setShowWatchListBtn((prev) => {
                  let newState = [];
                  for (let i = 0; i < prev.length; i++) {
                    if (i === index) {
                      newState.push(true);
                    } else {
                      newState.push(false);
                    }
                  }
                  return [...newState];
                })
              }
              onMouseLeave={() =>
                setShowWatchListBtn((prev) => {
                  let newState = [];
                  for (let i = 0; i < prev.length; i++) {
                    if (i === index) {
                      newState.push(false);
                    } else {
                      newState.push(false);
                    }
                  }
                  return [...newState];
                })
              }
              key={item.product_id}
              className="w-[330px] h-[420px] hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-gray-300 px-2 py-2 m-2 bg-white rounded-[16px] cursor-pointer"
            >
              <div className="flex justify-center relative">
                <img
                  src={item.product_images[0]}
                  alt="prod_image"
                  loading="lazy"
                  className="w-full h-[280px] p-2 rounded-[16px] "
                />
                {showWatchListBtn[index] && (
                  <div className="absolute bottom-4 flex justify-center transition duration-200">
                    {watchList.length > 0 &&
                    watchList.some((prod) => prod === item.product_id) ? (
                      <button
                        onClick={() => removeFromWatchList(item.product_id)}
                        className="w-[200px] h-[42px] rounded-[22px] text-white bg-red-500  border border-gray-400 z-10 hover:transition hover:duration-200 hover:scale-x-105 flex justify-center items-center text-[13px] font-medium"
                      >
                        <RemoveIcon />
                        <p className="text-center px-2 py-1">
                          Remove From Watchlist
                        </p>
                      </button>
                    ) : (
                      <button
                        onClick={() => addToWatchList(item.product_id)}
                        className="w-[200px] h-[42px] rounded-[22px] text-black bg-white border border-gray-400 z-10 hover:transition hover:duration-200 hover:scale-x-105 flex justify-center items-center"
                      >
                        <WatchListIcon />
                        <p className="text-center px-2 py-1">WatchList</p>
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="flex justify-between px-2 py-2">
                <div>
                  <div className="text-gray-600 text-[14px]">
                    {item.product_category.charAt(0).toUpperCase() +
                      item.product_category.substring(1)}
                  </div>
                  <div className="font-medium text-[16px]">
                    {item.product_title.length > 25
                      ? item.product_title.substring(0, 25) + "..."
                      : item.product_title}
                  </div>
                  <div className="flex justify-start py-1">
                    <div className="flex justify-center items-center">
                      {item.user_photo ? (
                        <img
                          src={item.user_photo}
                          className="w-[30px] h-[30px] rounded-full"
                        />
                      ) : (
                        <SmallUserIcon />
                      )}
                    </div>
                    <div className="flex justify-center items-center mx-1 text-[14px] py-1 text-gray-600">
                      {item.user_name}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-end py-1">
                    <div className="w-fit h-fit px-1 py-1 hover:bg-gray-200 rounded-full cursor-pointer">
                      <HeartOutlineIcon />
                    </div>
                  </div>
                  <div className="flex justify-end py-2 font-medium text-[17px]">
                    ₹{item.product_set_price.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Mobile */}
      <div className="lg:hidden flex justify-center">
        <div>
          {items.map((item, index) => (
            <div
              key={item.product_id}
              onMouseEnter={() =>
                setShowWatchListBtn((prev) => {
                  let newState = [];
                  for (let i = 0; i < prev.length; i++) {
                    if (i === index) {
                      newState.push(true);
                    } else {
                      newState.push(false);
                    }
                  }
                  return [...newState];
                })
              }
              onMouseLeave={() =>
                setShowWatchListBtn((prev) => {
                  let newState = [];
                  for (let i = 0; i < prev.length; i++) {
                    if (i === index) {
                      newState.push(false);
                    } else {
                      newState.push(false);
                    }
                  }
                  return [...newState];
                })
              }
              className="w-full h-[400px] p-4 shadow-lg shadow-gray-200  mt-2 mb-2 bg-white rounded-[16px] cursor-pointer"
            >
              <div className="relative">
                <img
                  src={item.product_images[0]}
                  className="w-full h-[250px] rounded-[25px]"
                  alt="loading"
                  loading="lazy"
                />
                <div className="absolute right-4 top-2">
                  <div className="w-[30px] h-[30px] rounded-full bg-gray-300 px-2 py-2 flex justify-center items-center">
                    {watchList.length > 0 &&
                    watchList.some((prod) => prod === item.product_id) ? (
                      <div onClick={() => removeFromWatchList(item.product_id)}>
                        <RemoveIcon />
                      </div>
                    ) : (
                      <div onClick={() => addToWatchList(item.product_id)}>
                        <SmallWatchListIcon />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="py-2 px-4 flex justify-between">
                <div>
                  <div className="text-gray-600 text-[14px]">
                    {item.product_category.charAt(0).toUpperCase() +
                      item.product_category.substring(1)}
                  </div>
                  <div className="font-medium text-[16px]">
                    {item.product_title.length > 25
                      ? item.product_title.substring(0, 25) + "..."
                      : item.product_title}
                  </div>
                  <div className="flex justify-start py-1">
                    <div className="flex justify-center items-center">
                      {item.user_photo ? (
                        <img
                          src={item.user_photo}
                          className="w-[30px] h-[30px] rounded-full"
                        />
                      ) : (
                        <SmallUserIcon />
                      )}
                    </div>
                    <div className="flex justify-center items-center mx-1 text-[14px] py-1 text-gray-600">
                      {item.user_name}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-end py-1">
                    <div className="w-fit h-fit px-1 py-1 hover:bg-gray-200 rounded-full cursor-pointer">
                      <HeartOutlineIcon />
                    </div>
                  </div>
                  <div className="flex justify-end py-2 font-medium text-[17px]">
                    ₹{item.product_set_price.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDisplay;
