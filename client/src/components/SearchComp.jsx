/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { SEARCH_API } from "../backendapi";

const SearchComp = ({ content }) => {
  const [results, setResults] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const timerRef = useRef(null);
  useEffect(() => {
    const getSearchResult = async (s) => {
      let returnedResult = [];
      if (
        localStorage.getItem("auction-suggest") &&
        JSON.parse(localStorage.getItem("auction-suggest"))[content]
      ) {
        returnedResult = [
          ...JSON.parse(localStorage.getItem("auction-suggest"))[content],
        ];
        setResults(returnedResult);
      } else {
        returnedResult = await fetch(SEARCH_API + `?content=${s}`, {
          method: "GET",
        });
        let jsonResult = await returnedResult.json();
        returnedResult = [...jsonResult.result];
        console.log("checking for two calls");
        setResults(returnedResult);
      }
      if (returnedResult.length === 0) setShowSuggestion(false);
      else {
        setShowSuggestion(true);
        localStorage.setItem(
          "auction-suggest",
          JSON.stringify({
            ...JSON.parse(localStorage.getItem("auction-suggest")),
            [content]: [...returnedResult],
          })
        );
      }
    };
    if (content == "" || content == undefined) setShowSuggestion(false);
    if (content != "" && content != undefined) {
      timerRef.current = setTimeout(() => {
        getSearchResult(content);
      }, 300);
    }
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [content]);

  return (
    <>
      {showSuggestion && (
        <div className="w-full h-fit max-h-[450px] overflow-y-auto p-2 rounded-black bg-cyan-900  font-extrabold rounded-xl">
          {results.map((prod, index) => {
            return prod.item_category === "people" ? (
              <div
                key={index}
                className="flex justify-start items-center px-2 py-1 hover:bg-cyan-600 cursor-pointer rounded-xl font-inter text-white"
              >
                {prod.user_name}
              </div>
            ) : (
              <div
                key={index}
                className="flex justify-start items-center px-2 py-1 hover:bg-cyan-600 cursor-pointer rounded-xl font-inter text-white"
              >
                {prod.product_title}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default SearchComp;
