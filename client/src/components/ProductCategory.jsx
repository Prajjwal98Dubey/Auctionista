/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { mapProductCategory } from "../helpers/mapCategoryToOptions";

const ProductCategory = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="w-full flex justify-center font-inter">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 w-[95%] ">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/30 blur-xl"></div>
          <div className="relative overflow-x-auto pb-4 hide-scrollbar  ">
            <div className="flex space-x-4 px-4 ">
              {mapProductCategory.map((category, index) => (
                <Link
                  key={index}
                  to={`/?category=${category}`}
                  className="flex-none first:ml-4 last:mr-4"
                >
                  <div
                    onClick={() => setSelectedCategory(category)}
                    className={`
                      px-4 py-1 rounded-[30px]
                      whitespace-nowrap
                      transition-all duration-300
                      font-medium text-base
                      hover:scale-105
                      ${
                        category === selectedCategory
                          ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-violet-500/25"
                          : "bg-gradient-to-r from-cyan-700 to-blue-700 text-white font-bold"
                      }
                      backdrop-blur-sm
                      border border-white/10
                      hover:border-white/20
                    `}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;

/**
 * 
 * 
 *  ----- ORIGINAL UI ---------------
 * 
 * <div className="w-full flex justify-center mb-[15px]">
      <div className="flex justify-around items-center p-1 rounded-[36px] border border-teal-400">
        {mapProductCategory.map((category, index) => (
          <Link key={index} to={`/?category=${category}`}>
            <div
              onClick={() => {
                setSelectedCategory(category);
              }}
              className={`w-full h-fit p-2 ${
                category === selectedCategory
                  ? "text-green-500"
                  : "text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400"
              } hover:text-red-500 m-1 cursor-pointer`}
            >
              {category.charAt(0).toLocaleUpperCase() +
                category.substring(1, category.length)}
            </div>
          </Link>
        ))}
      </div>
    </div>
 * 
 */
