import { useEffect } from "react";
import { UPDATE_PRODUCT_BID, UPDATE_SPECIFIC_PRODUCT_BID } from "../backendapi";
import { useLocation } from "react-router-dom";

const AuctionEndComp = () => {
  const location = useLocation();
  useEffect(() => {
    const updateHighestBid = async () => {
      await fetch(
        UPDATE_PRODUCT_BID +
          `?prodId=${location.search.substring(1).split("&")[0].split("=")[1]}`,
        {
          method: "GET",
        }
      );
      await fetch(
        UPDATE_SPECIFIC_PRODUCT_BID +
          `?prodId=${
            location.search.substring(1).split("&")[0].split("=")[1]
          }&category=${
            location.search.substring(1).split("&")[1].split("=")[1]
          }`,
        {
          method: "GET",
        }
      );
    };
    updateHighestBid();
  }, [location.search]);
  return (
    <>
      <div className="font-bold text-white">
        <p className="text-center  text-[15px]">Over</p>
      </div>
    </>
  );
};

export default AuctionEndComp;
