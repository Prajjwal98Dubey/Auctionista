import { useEffect, useState } from "react";
import { CategoriesCloseIcon, DownIcon } from "../icons/Icons";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedCategory } from "../redux/slices/categorySlice";
import { DISPLAY_PRODUCTS_API } from "../helpers/backendApi";
import { getProductList } from "../redux/slices/productSlice";
import ProductDisplay from "./ProductDisplay";
import CategoryProductsShimmer from "../ui-shimmers/CategoryProductsShimmer";

const categoryList = [
  "All",
  "Mobile",
  "Laptop",
  "Monitor",
  "Keyboard",
  "Mouse",
  "Headphone",
  "Electronics",
];
const Categories = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const selectedCategory = useSelector((store) => store.category.selected); // redux
  const [selectedCategoryState, setSelectedCategoryState] = useState("all");
  const productsList = useSelector((store) => store.products.items);
  const [prodList, setProdList] = useState(productsList);
  useEffect(() => {
    const getProductDetails = async () => {
      setIsLoading(true);
      let res = await fetch(
        DISPLAY_PRODUCTS_API +
          `?category=${selectedCategoryState.toLowerCase()}`
      );
      res = await res.json();
      dispatch(
        getProductList({
          category: selectedCategoryState.toLowerCase(),
          items: res.products,
        })
      );
      setProdList([...res.products]);
      setIsLoading(false);
    };
    if (!productsList[selectedCategoryState.toLowerCase()]) {
      getProductDetails();
    } else {
      setProdList([...productsList[selectedCategoryState.toLowerCase()]]);
      setIsLoading(false);
    }
  }, [selectedCategoryState, dispatch, productsList]);
  return (
    <>
      <div className="hidden lg:flex justify-start lg:w-full lg:h-[45px] py-5 font-kanit px-10">
        <div>
          <div className="flex">
            {categoryList.map((category, index) => (
              <div
                key={index}
                onClick={() => {
                  dispatch(updateSelectedCategory(category.toLowerCase()));
                  setSelectedCategoryState(category.toLowerCase());
                }}
                className={`font-medium min-w-[100px] max-w-[200px] h-fit text-[18px] px-2 py-2 border border-gray-200 rounded-[30px] flex justify-center items-center m-2 hover:transition hover:duration-200 hover:border hover:border-purple-700 hover:bg-purple-300 cursor-pointer ${
                  category === selectedCategory && "bg-purple-500 text-white"
                }`}
              >
                {category}
              </div>
            ))}
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center py-2 font-bold">
              <CategoryProductsShimmer />
            </div>
          ) : (
            <div>
              <ProductDisplay items={[...prodList]} />
            </div>
          )}
        </div>
      </div>

      <div className="lg:hidden flex justify-center w-full">
        <div>
          <div className="flex justify-center items-center py-4">
            <button
              onClick={() => setIsCategoriesOpen(true)}
              className="min-w-[100px] max-w-[200px] h-[45px] rounded-[30px] bg-purple-800/75 hover:bg-purple-800/95 hover:transition hover:duration-200  text-[18px] font-bold text-white flex items-center justify-center px-2 py-2"
            >
              <p className="py-2 px-1">{selectedCategoryState}</p>
              <DownIcon />
            </button>
          </div>
          {isCategoriesOpen && (
            <div className="fixed min-h-screen w-full bg-gray-700/80 top-0 left-0 z-10">
              <div className="py-12">
                {categoryList.map((category, index) => (
                  <div key={index} className="flex justify-center items-center">
                    <div
                      onClick={() => {
                        dispatch(
                          updateSelectedCategory(category.toLowerCase())
                        );
                        setIsCategoriesOpen(false);
                        setSelectedCategoryState(category.toLowerCase());
                      }}
                      className="py-4 px-2 w-fit   mt-2 mb-1 font-white text-[23px] text-gray-200 flex justify-center items-center  hover:text-purple-400/95 hover:transition hover:duration-200 font-bold"
                    >
                      {category}
                    </div>
                  </div>
                ))}
                <div className="flex justify-center items-center py-2">
                  <div
                    onClick={() => setIsCategoriesOpen(false)}
                    className="w-fit h-fit py-2 px-2 bg-white rounded-full flex justify-center items-center hover:bg-gray-300 hover:transition hover:duration-200 shadow-sm shadow-gray-200"
                  >
                    <CategoriesCloseIcon />
                  </div>
                </div>
              </div>
            </div>
          )}
          {isLoading ? (
            <div className="flex justify-center items-center py-2 font-bold">
              <CategoryProductsShimmer />
            </div>
          ) : (
            <div>
              <ProductDisplay items={[...prodList]} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Categories;
