/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import AuctionTimerStart from "./AuctionTimerStart";
import { timeLeftForAuction } from "../helpers/auctionTimerfn";

const AuctionTimer = ({ bid_start_time }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [bidStatus, setBidStatus] = useState("");
  const [timer, setTimer] = useState(false);
  useEffect(() => {
    let result = timeLeftForAuction(bid_start_time);
    if (result === "Coming Soon") {
      setTimer(true);
      setIsLoading(false);
    } else {
      setBidStatus(result);
      setIsLoading(false);
    }
  }, [bid_start_time]);
  return (
    <>
      {!isLoading &&
        (timer ? (
          <AuctionTimerStart
            bid_start_time={bid_start_time}
            isCallBack={false}
          />
        ) : (
          <div
            className={`text-white flex justify-center items-center font-bold bg-gradient-to-r ${
              bidStatus.toLocaleLowerCase() === "ended"
                ? "from-red-500 to-red-600"
                : "from-green-700 to-green-500"
            }   w-full h-full rounded-[20px] border border-gray-400 text-[10px] py-1 px-2 font-inter`}
          >
            {bidStatus}
          </div>
        ))}
    </>
  );
};

export default AuctionTimer;
