/* eslint-disable react/prop-types */
import { useState } from "react";
import ProductContext from "./ProductContext";

function ProductContextProvider({ children }) {
  const [productDetails, setProductDetails] = useState({});
  return (
    <ProductContext.Provider value={{ productDetails, setProductDetails }}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContextProvider;
