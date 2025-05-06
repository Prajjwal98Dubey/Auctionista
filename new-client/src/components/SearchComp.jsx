import React, { useEffect, useRef, useState } from "react";
import { SearchIcon, SmallSearchIcon } from "../icons/Icons";
import { SEARCH_API } from "../helpers/backendApi";

const SearchComp = ({ setIsSearchOpen }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const timerRef = useRef(null);
  const searchForResults = async () => {
    let res = await fetch(SEARCH_API + `${searchText}`, {
      method: "GET",
    });
    res = await res.json();
    setSearchResults(res.result);
    setIsLoading(false);
  };
  function debounce(cb, delay) {
    return function () {
      timerRef.current = setTimeout(() => {
        cb();
        timerRef.current = null;
      }, delay);
    };
  }
  const debouncedFunc = debounce(searchForResults, 250);

  useEffect(() => {
    if (searchText.trim().length > 0) debouncedFunc();
    return () => clearTimeout(timerRef.current);
  }, [searchText]);

  return (
    <>
      <div
        onClick={() => {
          setIsSearchOpen(false);
        }}
        className="fixed top-0 left-0 bg-[#313131] w-full min-h-screen z-10 opacity-70"
      ></div>
      {console.log("results", searchResults)}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y/2 z-50 font-kanit">
        <div className="relative">
          <input
            autoFocus
            className="backdrop-blur-lg  bg-white/30 border border-white/20 rounded-md w-[670px] h-[45px] font-bold py-2 px-10 text-[20px]"
            placeholder="Search for people,product"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div className="absolute  top-1/2 transform -translate-y-1/2 left-2">
            <SmallSearchIcon />
          </div>
        </div>
        {!isLoading && searchResults.length > 0 && (
          <div className="backdrop-blur-lg  bg-white/30 border border-white/20 rounded-md w-[670px] h-fit  overflow-hidden mt-1">
            {searchResults.map((result, index) => (
              <div
                key={index}
                className="w-full py-2 px-2 hover:cursor-pointer hover:bg-gray-400"
              >
                {result.product_title ? result.product_title : result.user_name}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchComp;
