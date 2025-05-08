import React, { useEffect, useState } from "react";
import { PRODUCT_FEATURES_LIST_API } from "../helpers/backendApi";
import { mapCategoriesToComponent } from "../helpers/mapCategoryFunc";

const ProductFeatureTable = ({ prodId, prodCategory }) => {
  const [features, setFeatures] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getProductFeaturesList = async () => {
      let res = await fetch(
        PRODUCT_FEATURES_LIST_API + `?prodId=${prodId}&category=${prodCategory}`
      );
      res = await res.json();
      setFeatures(res.details);
      setIsLoading(false);
    };

    getProductFeaturesList();
  }, [prodCategory, prodId]);
  return (
    <>
      <div className="px-6 font-bold text-3xl ">Features</div>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className=" font-kanit w-full h-fit px-2 py-1 grid grid-cols-4 border border-gray-400 rounded-md mb-1">
          {Object.keys(features).map((feature) => {
            return (
              mapCategoriesToComponent[prodCategory.toLowerCase()][feature] && (
                <div
                  key={feature}
                  className="w-[250px] h-[50px] px-10 py-[2px]"
                >
                  <div className="text-[13px] text-gray-500 font-medium flex justify-center items-center">
                    {
                      mapCategoriesToComponent[prodCategory.toLowerCase()][
                        feature
                      ]
                    }
                  </div>
                  <div
                    className={`text-[15px] font-semibold text-[#313131] flex justify-center items-center`}
                  >
                    {features[feature] ? features[feature] : "-"}
                  </div>
                </div>
              )
            );
          })}
        </div>
      )}
    </>
  );
};

export default ProductFeatureTable;
