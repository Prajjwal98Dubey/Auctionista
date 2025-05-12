import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productInitialDetails: {},
  productFeatureList: {},
};

const productInfoSlice = createSlice({
  name: "productInfo",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.productInitialDetails[action.payload.productId] = {
        ...action.payload.productDetails,
      };
    },
    addProductFeature: (state, action) => {
      state.productFeatureList[action.payload.productId] = {
        ...action.payload.features,
      };
    },
  },
});

export const { addProduct, addProductFeature } = productInfoSlice.actions;
export default productInfoSlice.reducer;
