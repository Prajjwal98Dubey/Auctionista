/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { divideTimeIntoThreeParts } from "../helpers/formatTime";
import AuctionEndComp from "./AuctionEndComp";

const AuctionTimerStart = ({ bid_start_time, isCallBack }) => {
  const [hours, setHours] = useState(
    divideTimeIntoThreeParts(bid_start_time).split(":")[0]
  );
  const [minutes, setMinutes] = useState(
    divideTimeIntoThreeParts(bid_start_time).split(":")[1]
  );
  const [seconds, setSeconds] = useState(
    divideTimeIntoThreeParts(bid_start_time).split(":")[2]
  );
  const intervalRef = useRef(null);

  useEffect(() => {
    if (intervalRef.current != null) {
      if (parseInt(seconds) == 0) {
        if (parseInt(hours) > 0 && parseInt(minutes) == 0) {
          setHours((prev) =>
            parseInt(prev) - 1 < 10
              ? "0" + (parseInt(prev) - 1).toString()
              : (parseInt(prev) - 1).toString()
          );
          setMinutes("59");
          setSeconds("59");
        } else if (parseInt(minutes) > 0) {
          setSeconds("59");
          setMinutes((prev) =>
            parseInt(prev) - 1 < 10
              ? "0" + (parseInt(prev) - 1).toString()
              : (parseInt(prev) - 1).toString()
          );
        } else {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }
    if (intervalRef.current == null && parseInt(seconds) != 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) =>
          parseInt(prev) - 1 < 10
            ? "0" + (parseInt(prev) - 1).toString()
            : (parseInt(prev) - 1).toString()
        );
      }, [1000]);
    }
  }, [hours, minutes, seconds]);

  return (
    <div className="bg-opacity-30 backdrop-blur-md text-white text-sm font-extrabold px-3 py-1 rounded-[20px] border border-gray-400 w-[84px] h-[30px] bg-[#010101] ">
      {(parseInt(hours) != 0 ||
        parseInt(minutes) != 0 ||
        parseInt(seconds) != 0) && (
        <p className="text-center">{hours + ":" + minutes + ":" + seconds}</p>
      )}
      {parseInt(hours) == 0 &&
        parseInt(minutes) == 0 &&
        parseInt(seconds) == 0 &&
        isCallBack && <AuctionEndComp />}
    </div>
  );
};

export default AuctionTimerStart;
