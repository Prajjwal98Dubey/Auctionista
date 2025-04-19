import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {}, // products = {"mobile":[{},{}]}
};

const productSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    getProductList(state, action) {
      if (!state.items[action.payload.category]) {
        state.items[action.payload.category] = [...action.payload.items];
      }
      // console.log("after inside the reducer", state.items);
    },
  },
});

export const { getProductList } = productSlice.actions;
export default productSlice.reducer;
